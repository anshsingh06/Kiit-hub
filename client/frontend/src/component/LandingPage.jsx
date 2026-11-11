import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupDialog from './SignupDialog';
import './LandingPage.css';
import campusImage from '../assets/kiitfront.jpg';
import seniorsImage from '../assets/asksenior.jpg';
import eventsImage from '../assets/event.jpg';
import communityImage from '../assets/interactive.jpg';

const features = [
  {
    number: '01',
    eyebrow: 'Learn from each other',
    title: 'Good questions deserve good answers.',
    description:
      'Bring academic and placement questions to the discussion space, and learn from perspectives across the student community.',
    image: seniorsImage,
    alt: 'Students talking together on campus',
    link: '/discussion',
    linkText: 'Visit discussions',
    theme: 'sage',
  },
  {
    number: '02',
    eyebrow: 'Find your next thing',
    title: 'There is always something happening.',
    description:
      'Browse campus event details and discover opportunities to show up, join in, and try something new.',
    image: eventsImage,
    alt: 'Students gathered for a campus event',
    link: '/events',
    linkText: 'Explore events',
    theme: 'lime',
  },
  {
    number: '03',
    eyebrow: 'Feel part of campus',
    title: 'A little more connected, every day.',
    description:
      'Keep campus conversations and useful updates closer, all from one welcoming place built around student life.',
    image: communityImage,
    alt: 'Students connecting as a campus community',
    link: '/about',
    linkText: 'Get to know us',
    theme: 'cream',
  },
];

function LandingPage() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-hero__glow" aria-hidden="true" />
        <div className="landing-shell landing-hero__grid">
          <div className="landing-hero__copy">
            <p className="landing-eyebrow">
              <span className="landing-eyebrow__dot" />
              Your campus, a little closer
            </p>
            <h1>
              Connect.
              <br />
              <span>Engage.</span>
              <br />
              Belong.
            </h1>
            <p className="landing-hero__intro">
              The student space for campus conversations, event discoveries,
              and the little moments that make university life yours.
            </p>
            <div className="landing-hero__actions">
              <button
                className="landing-button landing-button--light"
                onClick={() => setShowSignUp(true)}
                type="button"
              >
                Join KIIT Connect <span aria-hidden="true">↗</span>
              </button>
              <Link className="landing-hero__text-link" to="/events">
                See what’s happening <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="landing-hero__note">
              <span aria-hidden="true">✳</span>
              Made for the people who make campus feel like home.
            </div>
          </div>

          <div className="landing-hero__visual">
            <div className="landing-hero__image-frame">
              <img src={campusImage} alt="The KIIT campus" />
            </div>
            <div className="landing-hero__floating-card">
              <span className="landing-hero__floating-icon" aria-hidden="true">
                ✳
              </span>
              <span>
                <strong>Campus life, connected</strong>
                <small>Questions · Events · Community</small>
              </span>
            </div>
            <div className="landing-hero__orbit" aria-hidden="true">
              <span>DISCOVER · CONNECT · BELONG · </span>
            </div>
            <span className="landing-hero__sparkle" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>
        <a className="landing-scroll-cue" href="#discover">
          <span>Scroll to discover</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="landing-intro" id="discover">
        <div className="landing-shell landing-intro__grid">
          <div>
            <p className="landing-eyebrow landing-eyebrow--green">
              A shared space for student life
            </p>
            <h2>
              Campus is better
              <br />
              <span>when we show up.</span>
            </h2>
          </div>
          <div className="landing-intro__body">
            <p>
              University is more than classes. It’s questions you ask, events
              you discover, and people you meet along the way. KIIT Connect
              brings those parts of campus life into one easy-to-explore space.
            </p>
            <Link className="landing-inline-link" to="/about">
              Get to know KIIT Connect <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-shell">
          <div className="landing-section-heading">
            <div>
              <p className="landing-eyebrow landing-eyebrow--green">
                Your campus, in one place
              </p>
              <h2>
                Find your way
                <br />
                <span>into the conversation.</span>
              </h2>
            </div>
            <p>
              Start with a question, an event, or a new connection. There’s
              more than one way to feel at home here.
            </p>
          </div>

          <div className="landing-feature-grid">
            {features.map((feature) => (
              <article
                className={`landing-feature-card landing-feature-card--${feature.theme}`}
                key={feature.number}
              >
                <div className="landing-feature-card__image">
                  <img src={feature.image} alt={feature.alt} loading="lazy" />
                  <span className="landing-feature-card__number">
                    {feature.number}
                  </span>
                </div>
                <div className="landing-feature-card__content">
                  <p className="landing-feature-card__eyebrow">
                    {feature.eyebrow}
                  </p>
                  <h3>{feature.title}</h3>
                  <p className="landing-feature-card__description">
                    {feature.description}
                  </p>
                  <Link className="landing-feature-card__link" to={feature.link}>
                    {feature.linkText} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-manifesto">
        <div className="landing-shell landing-manifesto__inner">
          <div>
            <p className="landing-eyebrow">The best campus stories are shared.</p>
            <h2>
              Your next connection
              <br />
              could start with <span>hello.</span>
            </h2>
          </div>
          <Link className="landing-button landing-button--lime" to="/discussion">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
          <span className="landing-manifesto__decoration" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>

      <section className="landing-join">
        <div className="landing-shell landing-join__inner">
          <div className="landing-join__copy">
            <p className="landing-eyebrow landing-eyebrow--green">
              Your campus, your community
            </p>
            <h2>
              Come on in.
              <br />
              <span>There’s room for you.</span>
            </h2>
            <p>
              Sign up to get started and make KIIT Connect part of your campus
              experience.
            </p>
          </div>
          <button
            className="landing-button landing-button--green"
            onClick={() => setShowSignUp(true)}
            type="button"
          >
            Create your account <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-shell">
          <div className="landing-footer__grid">
            <div className="landing-footer__brand">
              <span className="landing-footer__brand-mark" aria-hidden="true">
                ✳
              </span>
              <strong>KIIT Connect</strong>
              <p>A little more connected.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <Link to="/about">About</Link>
              <Link to="/howitworks">How it works</Link>
              <Link to="/support">Support</Link>
            </div>
            <div>
              <h3>Community</h3>
              <Link to="/discussion">Discussion</Link>
              <Link to="/events">Events</Link>
              <Link to="/contact">Contact us</Link>
            </div>
            <div>
              <h3>Campus</h3>
              <Link to="/faq">Academic FAQs</Link>
              <Link to="/placements">Placements</Link>
              <Link to="/clubs">Clubs</Link>
            </div>
          </div>
          <div className="landing-footer__bottom">
            <span>© 2025 KIIT Connect</span>
            <span>Made for campus life.</span>
          </div>
        </div>
      </footer>

      <SignupDialog
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={() => setShowSignUp(false)}
      />
    </main>
  );
}

export default LandingPage;
