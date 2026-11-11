import { useState } from 'react';
import { Link } from 'react-router-dom';
import './CampusPages.css';

const projectEmail = 'kiithub@kiit.ac.in';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');
    const subject = encodeURIComponent(`KIIT Connect: ${topic}`);
    const body = encodeURIComponent(
      `Hello KIIT Connect team,\n\n${message}\n\nFrom: ${name}\nReply-to: ${email}`,
    );

    setSubmitted(true);
    window.location.href = `mailto:${projectEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="campus-page contact-page">
      <section className="campus-hero">
        <div className="campus-hero__glow" aria-hidden="true" />
        <div className="campus-shell campus-hero__inner">
          <div>
            <p className="campus-eyebrow">
              <span className="campus-eyebrow__dot" />
              We’d love to hear from you
            </p>
            <h1>
              Say hello.
              <br />
              <span>We’re listening.</span>
            </h1>
            <p className="campus-hero__intro">
              Share feedback, report a site issue, or ask a question about the
              KIIT Connect project. We’ll help you find the right next step.
            </p>
          </div>
          <div className="campus-hero-art contact-hero-art" aria-hidden="true">
            <div className="contact-hero-art__message">
              <span>✳</span>
              <i />
              <i />
              <i />
            </div>
            <div className="contact-hero-art__reply">
              <i />
              <i />
              <span>↗</span>
            </div>
            <span className="contact-hero-art__sparkle">✳</span>
            <span className="contact-hero-art__caption">A conversation starts here</span>
          </div>
        </div>
      </section>

      <section className="campus-section contact-content">
        <div className="campus-shell contact-grid">
          <div className="contact-aside">
            <p className="campus-eyebrow campus-eyebrow--green">Get in touch</p>
            <h2>
              What’s on
              <br />
              your <span>mind?</span>
            </h2>
            <p>
              Use the form to prepare an email to the project inbox. Your email
              app will open so you can review and send it.
            </p>
            <div className="contact-email-card">
              <span className="contact-email-card__icon" aria-hidden="true">✉</span>
              <span>
                <small>Project email</small>
                <a href={`mailto:${projectEmail}`}>{projectEmail}</a>
              </span>
              <span className="contact-email-card__arrow" aria-hidden="true">↗</span>
            </div>
            <p className="contact-disclaimer">
              This address is listed in the project’s existing contact
              information. Please verify it is active before relying on it.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__heading">
              <span>CONTACT THE PROJECT</span>
              <span className="contact-form__sparkle" aria-hidden="true">✳</span>
            </div>
            <label>
              Your name
              <input autoComplete="name" name="name" placeholder="How should we address you?" required />
            </label>
            <label>
              Your email
              <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
            </label>
            <label>
              What is this about?
              <select defaultValue="General question" name="topic">
                <option>General question</option>
                <option>Website feedback</option>
                <option>Report a site issue</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="Tell us a little more..." required rows="5" />
            </label>
            <button className="campus-button campus-button--green contact-form__submit" type="submit">
              Prepare email <span aria-hidden="true">↗</span>
            </button>
            {submitted && (
              <p className="contact-form__status" role="status">
                Your email app should open with the message ready to review.
                If it doesn’t, email us directly using the address shown here.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="contact-bottom">
        <div className="campus-shell contact-bottom__inner">
          <p>Looking for a quick answer instead?</p>
          <Link to="/faq">Visit the FAQs <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
