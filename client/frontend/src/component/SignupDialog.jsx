import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CircleX } from 'lucide-react';
import SignUp from './Signup';
import './SignupDialog.css';

export default function SignupDialog({ open, onClose, onSuccess }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="signup-dialog__overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-label="Create your KIIT Connect account"
        aria-modal="true"
        className="signup-dialog__panel"
        role="dialog"
      >
        <button
          aria-label="Close sign-up form"
          className="signup-dialog__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <CircleX size={27} />
        </button>
        <SignUp onSuccess={onSuccess} />
      </section>
    </div>,
    document.body,
  );
}
