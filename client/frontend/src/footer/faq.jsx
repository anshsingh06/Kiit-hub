import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './CampusPages.css';

const questions = [
  {
    category: 'Getting started',
    question: 'How do I create an account?',
    answer:
      'Choose Sign Up from the navigation and complete the registration form. The current registration flow asks for a KIIT email address, name, password, department, year, and a role.',
  },
  {
    category: 'Getting started',
    question: 'Can I use a non-KIIT email address?',
    answer:
      'The current registration endpoint checks for a KIIT email domain. If you have trouble registering with an eligible address, contact the project team.',
  },
  {
    category: 'Using the site',
    question: 'Where can I find campus events?',
    answer:
      'Open the Events page to browse event posts currently available in the app. Event details and images depend on what has been added to the site.',
  },
  {
    category: 'Using the site',
    question: 'How do I ask a question?',
    answer:
      'Open Discussions and choose “Ask Doubts.” Add a clear title and enough detail to help other students understand what you are asking.',
  },
  {
    category: 'Using the site',
    question: 'Does KIIT Connect send official university notifications?',
    answer:
      'KIIT Connect is a student community project, not an official university notification service. Check official university channels for authoritative notices and deadlines.',
  },
  {
    category: 'Academic information',
    question: 'Can I check my marks, syllabus, or revaluation status here?',
    answer:
      'No. The project does not provide access to academic records or the university ERP. Use the official student portal or contact your department for current academic procedures.',
  },
  {
    category: 'Academic information',
    question: 'Where should I ask about placement or department-specific rules?',
    answer:
      'For official rules, dates, and eligibility requirements, confirm with the relevant university office or department. You can also use Discussions for general peer perspectives.',
  },
  {
    category: 'Accounts and help',
    question: 'I forgot my password. How can I reset it?',
    answer:
      'A password-reset flow is not currently shown in the project interface. Contact the project team for help with the application, and never share your password in a discussion.',
  },
];

const categories = ['All questions', ...new Set(questions.map((item) => item.category))];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');
  const [openQuestion, setOpenQuestion] = useState(questions[0].question);

  const visibleQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return questions.filter((item) => {
      const matchesCategory =
        activeCategory === 'All questions' || item.category === activeCategory;
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="campus-page faq-page">
      <section className="campus-hero">
        <div className="campus-hero__glow" aria-hidden="true" />
        <div className="campus-shell campus-hero__inner">
          <div>
            <p className="campus-eyebrow">
              <span className="campus-eyebrow__dot" />
              The little things, cleared up
            </p>
            <h1>
              Questions?
              <br />
              <span>Start here.</span>
            </h1>
            <p className="campus-hero__intro">
              Find your way around KIIT Connect, understand what it can do, and
              know where to go for official university information.
            </p>
            <a className="campus-hero__scroll" href="#faq-list">
              Browse answers <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="campus-hero-art faq-hero-art" aria-hidden="true">
            <div className="faq-hero-art__big">?</div>
            <div className="faq-hero-art__bubble faq-hero-art__bubble--one"><i /><i /></div>
            <div className="faq-hero-art__bubble faq-hero-art__bubble--two"><i /><i /><i /></div>
            <span className="faq-hero-art__sparkle faq-hero-art__sparkle--one">✳</span>
            <span className="faq-hero-art__sparkle faq-hero-art__sparkle--two">✳</span>
            <span className="faq-hero-art__caption">Curiosity looks good on you</span>
          </div>
        </div>
      </section>

      <section className="campus-section faq-content" id="faq-list">
        <div className="campus-shell faq-layout">
          <aside className="faq-sidebar">
            <p className="campus-eyebrow campus-eyebrow--green">Help center</p>
            <h2>
              Find your
              <br />
              <span>answer.</span>
            </h2>
            <p>Search a topic or choose a category to narrow things down.</p>
            <label className="faq-search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search frequently asked questions"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search questions..."
                type="search"
                value={search}
              />
            </label>
            <div aria-label="FAQ categories" className="faq-categories">
              {categories.map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={activeCategory === category ? 'is-active' : ''}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                  <span>{category === 'All questions' ? questions.length : questions.filter((item) => item.category === category).length}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="faq-list">
            <div className="faq-list__heading">
              <span>{visibleQuestions.length} ANSWERS</span>
              <span className="faq-list__sparkle" aria-hidden="true">✳</span>
            </div>
            {visibleQuestions.length ? (
              visibleQuestions.map((item, index) => {
                const isOpen = openQuestion === item.question;
                return (
                  <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                    <button
                      aria-controls={`faq-answer-${index}`}
                      aria-expanded={isOpen}
                      className="faq-item__question"
                      onClick={() => setOpenQuestion(isOpen ? '' : item.question)}
                      type="button"
                    >
                      <span>
                        <small>{item.category}</small>
                        <strong>{item.question}</strong>
                      </span>
                      <span className="faq-item__toggle" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="faq-item__answer" id={`faq-answer-${index}`}>
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="faq-empty">
                <span aria-hidden="true">⌕</span>
                <h3>No matching questions yet.</h3>
                <p>Try a different search, or send the project team a note.</p>
                <Link to="/contact">Contact the project <span aria-hidden="true">↗</span></Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="faq-bottom">
        <div className="campus-shell faq-bottom__inner">
          <div>
            <p className="campus-eyebrow">Still wondering?</p>
            <h2>It’s okay to ask.</h2>
          </div>
          <div className="faq-bottom__actions">
            <Link className="campus-button campus-button--lime" to="/discussion">
              Ask the community <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/contact">Contact the project <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
