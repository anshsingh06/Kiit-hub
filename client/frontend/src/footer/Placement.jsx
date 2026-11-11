import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CampusPages.css';

const checklist = [
  'Write a clear one-page resume tailored to the role.',
  'Prepare a short introduction and a few project stories.',
  'Practice role-relevant fundamentals and problem solving.',
  'Review the official eligibility criteria and application dates.',
];

const prepAreas = [
  {
    number: '01',
    title: 'Tell your story',
    description:
      'Keep your resume readable, specific, and focused on what you contributed. Be ready to explain each project clearly.',
    icon: '✳',
  },
  {
    number: '02',
    title: 'Practice with purpose',
    description:
      'Build a steady routine for aptitude, communication, and the technical topics that match your target role.',
    icon: '◎',
  },
  {
    number: '03',
    title: 'Verify the details',
    description:
      'Use official placement-cell and university communications for current schedules, eligibility, and application steps.',
    icon: '↗',
  },
];

export default function Placement() {
  const [completedItems, setCompletedItems] = useState([]);
  const completedCount = completedItems.length;

  const toggleItem = (item) => {
    setCompletedItems((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item],
    );
  };

  return (
    <main className="campus-page placement-page">
      <section className="campus-hero">
        <div className="campus-hero__glow" aria-hidden="true" />
        <div className="campus-shell campus-hero__inner">
          <div>
            <p className="campus-eyebrow">
              <span className="campus-eyebrow__dot" />
              A little preparation goes a long way
            </p>
            <h1>
              Make your
              <br />
              next step <span>count.</span>
            </h1>
            <p className="campus-hero__intro">
              A practical starting point for getting ready for placements:
              prepare your story, practice the skills, and verify every
              important detail.
            </p>
            <a className="campus-hero__scroll" href="#placement-guide">
              Explore the guide <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="campus-hero-art placement-hero-art" aria-hidden="true">
            <div className="placement-hero-art__orbit" />
            <div className="placement-hero-art__document">
              <span className="placement-hero-art__badge">READY</span>
              <span className="placement-hero-art__avatar">✳</span>
              <i className="wide" /><i /><i className="short" />
              <span className="placement-hero-art__divider" />
              <i className="wide" /><i className="short" />
              <span className="placement-hero-art__check">✓</span>
            </div>
            <span className="placement-hero-art__sparkle">✳</span>
            <span className="placement-hero-art__caption">Progress, one step at a time</span>
          </div>
        </div>
      </section>

      <section className="campus-section placement-guide" id="placement-guide">
        <div className="campus-shell">
          <div className="campus-section-heading">
            <div>
              <p className="campus-eyebrow campus-eyebrow--green">A thoughtful approach</p>
              <h2>
                Build confidence
                <br />
                <span>before the big day.</span>
              </h2>
            </div>
            <p>
              Use these as starting points, then tailor your preparation to
              your goals and the role.
            </p>
          </div>
          <div className="placement-card-grid">
            {prepAreas.map((area) => (
              <article className="placement-card" key={area.number}>
                <div className="placement-card__top">
                  <span>{area.number}</span>
                  <span className="placement-card__icon" aria-hidden="true">{area.icon}</span>
                </div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="placement-checklist-section">
        <div className="campus-shell placement-checklist-layout">
          <div className="placement-checklist-copy">
            <p className="campus-eyebrow campus-eyebrow--green">Your personal prep list</p>
            <h2>
              Small steps
              <br />
              <span>add up.</span>
            </h2>
            <p>
              Check off what you’ve already done. Your progress stays in this
              page session and is not saved to an account.
            </p>
            <Link className="placement-community-link" to="/discussion">
              Compare notes with the community <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="placement-checklist">
            <div className="placement-checklist__header">
              <div>
                <span>THE STARTER CHECKLIST</span>
                <h3>Ready when you are.</h3>
              </div>
              <span className="placement-checklist__count">
                {completedCount}/{checklist.length}
              </span>
            </div>
            <div
              aria-label={`${completedCount} of ${checklist.length} preparation items complete`}
              className="placement-checklist__progress"
              role="progressbar"
              aria-valuemax={checklist.length}
              aria-valuemin={0}
              aria-valuenow={completedCount}
            >
              <span style={{ width: `${(completedCount / checklist.length) * 100}%` }} />
            </div>
            <div className="placement-checklist__items">
              {checklist.map((item) => (
                <label className="placement-check" key={item}>
                  <input
                    checked={completedItems.includes(item)}
                    onChange={() => toggleItem(item)}
                    type="checkbox"
                  />
                  <span className="placement-check__box" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </label>
              ))}
            </div>
            <p className="placement-checklist__footnote">
              Always confirm placement schedules and requirements through official university channels.
            </p>
          </div>
        </div>
      </section>

      <section className="placement-bottom">
        <div className="campus-shell placement-bottom__inner">
          <div>
            <p className="campus-eyebrow">Keep learning together</p>
            <h2>One conversation can change your perspective.</h2>
          </div>
          <Link className="campus-button campus-button--lime" to="/discussion">
            Visit discussions <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
