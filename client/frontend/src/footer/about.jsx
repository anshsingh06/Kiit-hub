import { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import campusImage from '../assets/kiitfront.jpg';
import communityImage from '../assets/interactive.jpg';
import eventImage from '../assets/asksenior.jpg';

const campusMoments = [
  {
    image: campusImage,
    alt: 'KIIT campus and its central building',
    label: 'One campus, many stories',
    caption: 'A shared home for ideas, ambition, and everyday campus life.',
  },
  {
    image: communityImage,
    alt: 'Students spending time together on campus',
    label: 'Better when we connect',
    caption: 'The best campus experiences often start with a conversation.',
  },
  {
    image: eventImage,
    alt: 'Students gathered at a university event',
    label: 'Make room for discovery',
    caption: 'Find the events, people, and new interests that make campus yours.',
  },
];

const values = [
  {
    number: '01',
    title: 'Find your people',
    description:
      'A welcoming starting point for student conversations, shared questions, and useful peer perspectives.',
    mark: '↗',
  },
  {
    number: '02',
    title: 'Stay in the know',
    description:
      'Explore campus event updates and discover what is happening around the university.',
    mark: '✳',
  },
  {
    number: '03',
    title: 'Make every day count',
    description:
      'Bring useful campus information and student community experiences a little closer together.',
    mark: '◎',
  },
];

export default function About() {
  const [activeMoment, setActiveMoment] = useState(0);
  const moment = campusMoments[activeMoment];

  const showMoment = (direction) => {
    setActiveMoment(
      (current) =>
        (current + direction + campusMoments.length) % campusMoments.length,
    );
  };

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__glow" aria-hidden="true" />
        <div className="about-shell about-hero__content">
          <div className="about-hero__copy">
            <p className="about-eyebrow">
              <span className="about-eyebrow__dot" />
              A little more connected
            </p>
            <h1>
              Campus life,
              <br />
              <span>closer together.</span>
            </h1>
            <p className="about-hero__intro">
              KIIT Connect brings student conversations and campus happenings
              into one welcoming place—so it is easier to find your people and
              feel part of what is going on.
            </p>
            <div className="about-hero__actions">
              <Link className="about-button about-button--light" to="/discussion">
                Join the conversation <span aria-hidden="true">↗</span>
              </Link>
              <Link className="about-text-link" to="/events">
                Explore campus events <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="about-hero__note">
              <span className="about-hero__note-mark" aria-hidden="true">
                ✳
              </span>
              Made for the moments that make campus yours.
            </div>
          </div>

          <div className="about-hero__visual">
            <div className="about-hero__image-frame">
              <img src={campusImage} alt="KIIT campus beneath a clear sky" />
            </div>
            <div className="about-photo-label">
              <span className="about-photo-label__icon" aria-hidden="true">
                ↗
              </span>
              <span>
                <strong>Life at KIIT</strong>
                <small>A community in motion</small>
              </span>
            </div>
            <div className="about-orbit" aria-hidden="true">
              <span>CONNECT · DISCOVER · BELONG · </span>
            </div>
            <span className="about-hero__sparkle" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>
        <a className="about-scroll-cue" href="#our-story">
          <span>Scroll to explore</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="about-story about-section" id="our-story">
        <div className="about-shell about-story__grid">
          <div className="about-story__heading">
            <p className="about-eyebrow about-eyebrow--green">The idea</p>
            <h2>
              College is more
              <br />
              than a <span>timetable.</span>
            </h2>
          </div>
          <div className="about-story__body">
            <p>
              It is the question you finally ask, the event you almost missed,
              and the people who make a new place feel familiar. KIIT Connect
              is designed to make those parts of student life easier to find
              and take part in.
            </p>
            <p>
              Start with a campus event, browse a discussion, or bring a
              question to the community. The goal is simple: make it easier for
              students to find helpful information and feel more connected to
              campus.
            </p>
            <Link className="about-inline-link" to="/howitworks">
              See how it works <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-values about-section">
        <div className="about-shell">
          <div className="about-section-heading">
            <div>
              <p className="about-eyebrow about-eyebrow--green">What brings us together</p>
              <h2>Small moments. <span>Big campus energy.</span></h2>
            </div>
            <p>
              A few ways KIIT Connect helps bring the campus experience into
              focus.
            </p>
          </div>
          <div className="about-value-grid">
            {values.map((value) => (
              <article className="about-value-card" key={value.number}>
                <div className="about-value-card__top">
                  <span>{value.number}</span>
                  <span className="about-value-card__mark" aria-hidden="true">
                    {value.mark}
                  </span>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <span className="about-value-card__line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-gallery about-section">
        <div className="about-shell about-gallery__grid">
          <div className="about-gallery__copy">
            <p className="about-eyebrow">A campus full of moments</p>
            <h2>
              Take a look
              <br />
              <span>around.</span>
            </h2>
            <p>
              From familiar places to new experiences, campus life is always
              unfolding. Explore a few snapshots, then find your next stop.
            </p>
            <Link className="about-button about-button--outline" to="/events">
              Find an event <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="about-gallery__stage">
            <div className="about-gallery__image-wrap">
              <img
                key={moment.image}
                src={moment.image}
                alt={moment.alt}
                className="about-gallery__image"
              />
              <span className="about-gallery__counter">
                0{activeMoment + 1} <span>/</span> 0{campusMoments.length}
              </span>
              <div className="about-gallery__caption">
                <span className="about-gallery__caption-star" aria-hidden="true">
                  ✳
                </span>
                <span>
                  <strong>{moment.label}</strong>
                  <small>{moment.caption}</small>
                </span>
              </div>
            </div>
            <div className="about-gallery__controls">
              <div className="about-gallery__dots" aria-label="Choose a campus photo">
                {campusMoments.map((item, index) => (
                  <button
                    aria-label={`Show photo ${index + 1}: ${item.label}`}
                    aria-pressed={activeMoment === index}
                    className={`about-gallery__dot${activeMoment === index ? ' is-active' : ''}`}
                    key={item.label}
                    onClick={() => setActiveMoment(index)}
                    type="button"
                  />
                ))}
              </div>
              <div className="about-gallery__arrows">
                <button
                  aria-label="Previous campus photo"
                  onClick={() => showMoment(-1)}
                  type="button"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  aria-label="Next campus photo"
                  onClick={() => showMoment(1)}
                  type="button"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-join">
        <div className="about-shell about-join__inner">
          <div>
            <p className="about-eyebrow">Your campus, your community</p>
            <h2>
              There’s a place
              <br />
              for you here.
            </h2>
          </div>
          <div className="about-join__aside">
            <p>
              Have a question, want to see what’s happening, or just ready to
              explore? Your next campus moment starts here.
            </p>
            <div className="about-join__actions">
              <Link className="about-button about-button--lime" to="/discussion">
                Visit discussions <span aria-hidden="true">↗</span>
              </Link>
              <Link className="about-join__secondary" to="/events">
                Browse events <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <span className="about-join__decoration" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </main>
  );
}
