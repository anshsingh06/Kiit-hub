import { Link } from 'react-router-dom';
import './CampusPages.css';

const supportOptions = [
  {
    number: '01',
    icon: '?',
    title: 'Find a quick answer',
    description:
      'Check common questions about accounts, campus information, and what you can do on KIIT Connect.',
    link: '/faq',
    linkText: 'Browse FAQs',
  },
  {
    number: '02',
    icon: '↗',
    title: 'Ask the community',
    description:
      'For general student questions, head to Discussions and see whether the community can point you in the right direction.',
    link: '/discussion',
    linkText: 'Open discussions',
  },
  {
    number: '03',
    icon: '✉',
    title: 'Contact the project',
    description:
      'Have feedback about the site itself? Send the project team a note using the contact page.',
    link: '/contact',
    linkText: 'Get in touch',
  },
];

export default function Support() {
  return (
    <main className="campus-page support-page">
      <section className="campus-hero">
        <div className="campus-hero__glow" aria-hidden="true" />
        <div className="campus-shell campus-hero__inner">
          <div>
            <p className="campus-eyebrow">
              <span className="campus-eyebrow__dot" />
              A hand when you need one
            </p>
            <h1>
              Let’s figure
              <br />
              it <span>out.</span>
            </h1>
            <p className="campus-hero__intro">
              Start with a quick answer, ask the student community, or send
              feedback about KIIT Connect. Choose the path that fits.
            </p>
          </div>
          <div className="campus-hero-art support-hero-art" aria-hidden="true">
            <div className="support-hero-art__ring">
              <span>?</span>
            </div>
            <span className="support-hero-art__orbit support-hero-art__orbit--one">✳</span>
            <span className="support-hero-art__orbit support-hero-art__orbit--two">↗</span>
            <div className="support-hero-art__note">
              <i />
              <i />
              <i />
            </div>
            <span className="support-hero-art__caption">Here to help you find your way</span>
          </div>
        </div>
      </section>

      <section className="campus-section support-options">
        <div className="campus-shell">
          <div className="campus-section-heading">
            <div>
              <p className="campus-eyebrow campus-eyebrow--green">Choose your next step</p>
              <h2>
                A good place
                <br />
                <span>to start.</span>
              </h2>
            </div>
            <p>
              Different questions need different answers. Pick the route that
              feels right.
            </p>
          </div>
          <div className="support-card-grid">
            {supportOptions.map((option) => (
              <article className="support-card" key={option.number}>
                <div className="support-card__top">
                  <span>{option.number}</span>
                  <span className="support-card__icon" aria-hidden="true">{option.icon}</span>
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <Link to={option.link}>
                  {option.linkText} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-note">
        <div className="campus-shell support-note__inner">
          <span className="support-note__mark" aria-hidden="true">✳</span>
          <div>
            <p className="campus-eyebrow campus-eyebrow--green">A quick note</p>
            <h2>Official university services?</h2>
            <p>
              KIIT Connect is a student community project, not the university’s
              official ERP or help desk. For academic records, account access,
              or formal university requests, use the relevant official channel.
            </p>
          </div>
          <Link className="campus-button campus-button--green" to="/howitworks">
            See how it works <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
