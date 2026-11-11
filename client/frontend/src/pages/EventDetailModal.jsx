import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CalendarDays, CircleX } from 'lucide-react';
import './EventDetailModal.css';

function EventDetailModal({ event, onClose }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  const imageUrl = event.images?.[0]
    ? `http://localhost:5000/uploads/${event.images[0]}`
    : null;
  const eventDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  const postedDate = event.createdAt
    ? new Date(event.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return createPortal(
    <div
      className="event-detail-overlay"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) onClose();
      }}
    >
      <article
        aria-label={`${event.title} event details`}
        aria-modal="true"
        className="event-detail-dialog"
        role="dialog"
      >
        <button
          aria-label="Close event details"
          className="event-detail-close"
          onClick={onClose}
          type="button"
        >
          <CircleX size={29} />
        </button>

        {imageUrl ? (
          <div className="event-detail-image">
            <img src={imageUrl} alt={`${event.title} event`} />
            <span className="event-detail-image__label">EVENT DETAILS</span>
          </div>
        ) : (
          <div className="event-detail-image event-detail-image--placeholder">
            <span aria-hidden="true">✳</span>
            <span className="event-detail-image__label">EVENT DETAILS</span>
          </div>
        )}

        <div className="event-detail-content">
          <p className="event-detail-eyebrow">KIIT Connect · Campus events</p>
          <h2>{event.title}</h2>
          {eventDate && (
            <div className="event-detail-date">
              <span className="event-detail-date__icon" aria-hidden="true">
                <CalendarDays size={18} />
              </span>
              <span>
                <small>Event date</small>
                <strong>{eventDate}</strong>
              </span>
            </div>
          )}
          <div className="event-detail-description">
            <h3>About this event</h3>
            <p>{event.description || 'No description has been added yet.'}</p>
          </div>
          {postedDate && (
            <p className="event-detail-posted">Posted {postedDate}</p>
          )}
        </div>
      </article>
    </div>,
    document.body,
  );
}

export default EventDetailModal;
