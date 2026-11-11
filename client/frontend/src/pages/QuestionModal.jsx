import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { CircleX, Sparkles } from 'lucide-react';

function QuestionModal({ onClose, onQuestionCreated, token }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && !submitting) onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose, submitting]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setError('Please sign up or sign in before asking a question.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await axios.post(
        'http://localhost:5000/api/posts',
        { title: title.trim(), content: content.trim() },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await onQuestionCreated();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Could not post your question. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      className="question-dialog__overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !submitting) onClose();
      }}
    >
      <section
        aria-label="Ask the community a question"
        aria-modal="true"
        className="question-dialog"
        role="dialog"
      >
        <button
          aria-label="Close question form"
          className="question-dialog__close"
          disabled={submitting}
          onClick={onClose}
          type="button"
        >
          <CircleX size={27} />
        </button>
        <div className="question-dialog__icon" aria-hidden="true">
          <Sparkles size={22} />
        </div>
        <p className="question-dialog__eyebrow">START A CONVERSATION</p>
        <h2>What’s on your mind?</h2>
        <p className="question-dialog__intro">
          Add a clear title and a little context so other students know how to help.
        </p>
        <form className="question-dialog__form" onSubmit={handleSubmit}>
          <label>
            Question title
            <input
              autoFocus
              maxLength={160}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What would you like to know?"
              required
              value={title}
            />
          </label>
          <label>
            More details
            <textarea
              maxLength={5000}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Share the context that might help someone answer..."
              required
              rows={5}
              value={content}
            />
          </label>
          {error && <p className="question-dialog__error" role="alert">{error}</p>}
          <button
            className="question-dialog__submit"
            disabled={submitting || !title.trim() || !content.trim()}
            type="submit"
          >
            {submitting ? 'Posting…' : 'Post question'}
            {!submitting && <span aria-hidden="true">↗</span>}
          </button>
        </form>
      </section>
    </div>,
    document.body,
  );
}

export default QuestionModal;
