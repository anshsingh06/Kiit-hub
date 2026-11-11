import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HowItWorks.css';

const journey = [
  {
    number: '01',
    label: 'Get started',
    title: 'Make yourself at home.',
    description:
      'Create an account with your KIIT email, add a few details, and choose the role that best describes you.',
    detail:
      'Select Sign Up in the navigation and complete the registration form. Your KIIT email is used to keep registration campus-focused.',
    action: 'Back to home',
    href: '/',
    icon: '↗',
    visual: 'account',
  },
  {
    number: '02',
    label: 'Explore events',
    title: 'Find something happening.',
    description:
      'Browse campus event posts, see the details, and discover something new to add to your campus experience.',
    detail:
      'Open Events to browse the available listings. Select an event to see its details, date, and any image included with the post.',
    action: 'Browse events',
    href: '/events',
    icon: '✳',
    visual: 'events',
  },
  {
    number: '03',
    label: 'Join in',
    title: 'Bring your question.',
    description:
      'Visit the discussion space to explore student questions or start a conversation of your own.',
    detail:
      'Open Discussion to browse the forum. Choose Ask Doubts to write a question and add a little context for the community.',
    action: 'Visit discussions',
    href: '/discussion',
    icon: '◎',
    visual: 'discussion',
  },
];

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step = journey[activeStep];

  return (
    <main className="how-page">
      <section className="how-hero">
        <div className="how-hero__glow" aria-hidden="true" />
        <div className="how-shell how-hero__inner">
          <div className="how-hero__copy">
            <p className="how-eyebrow">
              <span className="how-eyebrow__dot" />
              A simple place to begin
            </p>
            <h1>
              Your campus.
              <br />
              <span>Your next move.</span>
            </h1>
            <p className="how-hero__intro">
              Get set up, explore what’s happening, and join the conversation.
              Here’s how to find your way around KIIT Connect.
            </p>
            <a className="how-hero__scroll" href="#your-journey">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="how-hero__visual" aria-hidden="true">
            <div className="how-orbit how-orbit--outer" />
            <div className="how-orbit how-orbit--inner" />
            <div className="how-hero__center">
              <span>✳</span>
              <strong>KIIT</strong>
              <small>CONNECT</small>
            </div>
            <div className="how-float how-float--one">
              <span>01</span> Get started
            </div>
            <div className="how-float how-float--two">
              <span>02</span> Find events
            </div>
            <div className="how-float how-float--three">
              <span>03</span> Join in
            </div>
            <span className="how-hero__sparkle how-hero__sparkle--one">✳</span>
            <span className="how-hero__sparkle how-hero__sparkle--two">✳</span>
          </div>
        </div>
      </section>

      <section className="how-journey" id="your-journey">
        <div className="how-shell">
          <div className="how-section-heading">
            <div>
              <p className="how-eyebrow how-eyebrow--green">Three steps to get going</p>
              <h2>
                Your guide to
                <br />
                <span>KIIT Connect.</span>
              </h2>
            </div>
            <p>
              Start wherever you are. Choose a step to see what you can do next.
            </p>
          </div>

          <div className="how-interactive">
            <div
              aria-label="How KIIT Connect works"
              className="how-step-list"
              role="tablist"
            >
              {journey.map((item, index) => (
                <button
                  aria-controls="how-step-panel"
                  aria-selected={activeStep === index}
                  className={`how-step${activeStep === index ? ' is-active' : ''}`}
                  id={`how-step-tab-${index}`}
                  key={item.number}
                  onClick={() => setActiveStep(index)}
                  role="tab"
                  type="button"
                >
                  <span className="how-step__number">{item.number}</span>
                  <span className="how-step__label">{item.label}</span>
                  <span className="how-step__arrow" aria-hidden="true">↗</span>
                </button>
              ))}
              <div className="how-step-list__hint">
                <span aria-hidden="true">✳</span>
                Pick a step to explore
              </div>
            </div>

            <article
              aria-labelledby={`how-step-tab-${activeStep}`}
              className={`how-detail how-detail--${step.visual}`}
              id="how-step-panel"
              role="tabpanel"
              tabIndex={0}
            >
              <div className="how-detail__topline">
                <span>STEP {step.number}</span>
                <span className="how-detail__icon" aria-hidden="true">{step.icon}</span>
              </div>
              <div className={`how-illustration how-illustration--${step.visual}`} aria-hidden="true">
                {step.visual === 'account' && (
                  <>
                    <span className="how-illustration__sun" />
                    <span className="how-illustration__card">
                      <span className="how-illustration__avatar">✳</span>
                      <span className="how-illustration__lines"><i /><i /><i /></span>
                      <span className="how-illustration__check">✓</span>
                    </span>
                    <span className="how-illustration__sparkle">✳</span>
                  </>
                )}
                {step.visual === 'events' && (
                  <>
                    <span className="how-illustration__sun" />
                    <span className="how-illustration__event-card how-illustration__event-card--back" />
                    <span className="how-illustration__event-card how-illustration__event-card--front">
                      <span className="how-illustration__event-image" />
                      <span className="how-illustration__lines"><i /><i /></span>
                      <span className="how-illustration__event-date">✳</span>
                    </span>
                    <span className="how-illustration__sparkle">✳</span>
                  </>
                )}
                {step.visual === 'discussion' && (
                  <>
                    <span className="how-illustration__bubble how-illustration__bubble--back">
                      <i /><i />
                    </span>
                    <span className="how-illustration__bubble how-illustration__bubble--front">
                      <i /><i /><i />
                    </span>
                    <span className="how-illustration__sparkle">✳</span>
                  </>
                )}
              </div>
              <p className="how-detail__eyebrow">{step.label}</p>
              <h3>{step.title}</h3>
              <p className="how-detail__description">{step.description}</p>
              <div className="how-detail__note">
                <span aria-hidden="true">✳</span>
                {step.detail}
              </div>
              <Link className="how-detail__link" to={step.href}>
                {step.action} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="how-reassurance">
        <div className="how-shell how-reassurance__inner">
          <div className="how-reassurance__mark" aria-hidden="true">✳</div>
          <div>
            <p className="how-eyebrow how-eyebrow--green">Made for campus life</p>
            <h2>
              Start with a question.
              <br />
              <span>Leave a little more connected.</span>
            </h2>
          </div>
          <Link className="how-button" to="/discussion">
            Go to discussions <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HowItWorks;
