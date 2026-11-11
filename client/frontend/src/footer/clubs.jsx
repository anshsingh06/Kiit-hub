import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CampusPages.css';

const interests = [
  {
    name: 'Technology',
    category: 'Build & explore',
    symbol: '</>',
    description:
      'Explore coding, robotics, design, research, and the ideas that turn curiosity into something real.',
    color: 'tech',
  },
  {
    name: 'Arts & performance',
    category: 'Create & perform',
    symbol: '✳',
    description:
      'Find ways to make, perform, and share—through music, dance, theatre, visual arts, or film.',
    color: 'arts',
  },
  {
    name: 'Literature & ideas',
    category: 'Read & express',
    symbol: 'Aa',
    description:
      'Follow your interest in writing, reading, debate, languages, and exchanging new perspectives.',
    color: 'ideas',
  },
  {
    name: 'Community & impact',
    category: 'Serve & contribute',
    symbol: '♡',
    description:
      'Look for opportunities to volunteer, collaborate, and contribute to causes that matter to you.',
    color: 'impact',
  },
  {
    name: 'Sports & wellbeing',
    category: 'Move & recharge',
    symbol: '↗',
    description:
      'Make time for movement, teamwork, friendly competition, and finding your people through sport.',
    color: 'sports',
  },
];

const filters = ['All interests', ...interests.map((interest) => interest.name)];

export default function Clubs() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const visibleInterests =
    activeFilter === 'All interests'
      ? interests
      : interests.filter((interest) => interest.name === activeFilter);

  return (
    <main className="campus-page clubs-page">
      <section className="campus-hero">
        <div className="campus-hero__glow" aria-hidden="true" />
        <div className="campus-shell campus-hero__inner">
          <div>
            <p className="campus-eyebrow">
              <span className="campus-eyebrow__dot" />
              There’s more to campus
            </p>
            <h1>
              Find your
              <br />
              kind of <span>people.</span>
            </h1>
            <p className="campus-hero__intro">
              From making and performing to building, playing, and giving back,
              campus is full of ways to follow what interests you.
            </p>
            <a className="campus-hero__scroll" href="#interest-map">
              Explore your interests <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="campus-hero-art clubs-hero-art" aria-hidden="true">
            <div className="clubs-hero-art__orbit clubs-hero-art__orbit--outer" />
            <div className="clubs-hero-art__orbit clubs-hero-art__orbit--inner" />
            <div className="clubs-hero-art__center">YOU</div>
            <span className="clubs-hero-art__node clubs-hero-art__node--one">Aa</span>
            <span className="clubs-hero-art__node clubs-hero-art__node--two">&lt;/&gt;</span>
            <span className="clubs-hero-art__node clubs-hero-art__node--three">✳</span>
            <span className="clubs-hero-art__node clubs-hero-art__node--four">♡</span>
            <span className="clubs-hero-art__sparkle">✳</span>
            <span className="clubs-hero-art__caption">Different interests. One campus.</span>
          </div>
        </div>
      </section>

      <section className="campus-section clubs-interests" id="interest-map">
        <div className="campus-shell">
          <div className="campus-section-heading">
            <div>
              <p className="campus-eyebrow campus-eyebrow--green">Follow your curiosity</p>
              <h2>
                What are you
                <br />
                <span>into?</span>
              </h2>
            </div>
            <p>
              Start with an interest and see where it takes you. These are
              categories to explore, not an official directory of current clubs.
            </p>
          </div>

          <div aria-label="Filter by interest" className="clubs-filters">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={activeFilter === filter ? 'is-active' : ''}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="clubs-grid">
            {visibleInterests.map((interest) => (
              <article
                className={`club-card club-card--${interest.color}`}
                key={interest.name}
              >
                <div className="club-card__art" aria-hidden="true">
                  <span className="club-card__number">0{interests.indexOf(interest) + 1}</span>
                  <span className="club-card__symbol">{interest.symbol}</span>
                  <span className="club-card__orbit" />
                  <span className="club-card__sparkle">✳</span>
                </div>
                <div className="club-card__content">
                  <p>{interest.category}</p>
                  <h3>{interest.name}</h3>
                  <span>{interest.description}</span>
                </div>
              </article>
            ))}
          </div>
          {visibleInterests.length === 1 && (
            <p className="clubs-filter-note">
              Showing one area. Choose “All interests” to see the full map.
            </p>
          )}
        </div>
      </section>

      <section className="clubs-note">
        <div className="campus-shell clubs-note__inner">
          <div className="clubs-note__icon" aria-hidden="true">✳</div>
          <div>
            <p className="campus-eyebrow campus-eyebrow--green">A note before you join</p>
            <h2>Find the latest details through official club channels.</h2>
            <p>
              Club names, membership, meeting times, and activities can change.
              Check current university or club announcements for accurate
              information.
            </p>
          </div>
          <Link className="campus-button campus-button--green" to="/events">
            Explore campus events <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
