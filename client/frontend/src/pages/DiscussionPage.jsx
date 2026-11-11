import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MessageCircle, MessageSquareText, Plus, Send, Sparkles, Trash2 } from 'lucide-react';
import QuestionModal from './QuestionModal';
import './DiscussionPage.css';

const API_URL = 'http://localhost:5000/api/posts';

function readSession() {
  try {
    const session = JSON.parse(localStorage.getItem('kiit-connect-auth') || 'null');
    return session?.token && session.user ? session : null;
  } catch {
    return null;
  }
}

function getErrorMessage(error, fallback) {
  if (error.response?.status === 401 || error.response?.status === 403) {
    return error.response.data?.message || 'Please sign in to do that.';
  }
  return error.response?.data?.message || fallback;
}

function DiscussionPage() {
  const [posts, setPosts] = useState([]);
  const [answerInputs, setAnswerInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState(readSession);
  const [loading, setLoading] = useState(true);
  const [submittingAnswer, setSubmittingAnswer] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [pageError, setPageError] = useState('');
  const [pageNotice, setPageNotice] = useState('');

  const fetchPosts = useCallback(async () => {
    setPageError('');
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
    } catch (error) {
      setPageError(getErrorMessage(error, 'Could not load discussions. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    const syncSession = () => setSession(readSession());
    window.addEventListener('storage', syncSession);
    window.addEventListener('kiit-auth-change', syncSession);
    return () => {
      window.removeEventListener('storage', syncSession);
      window.removeEventListener('kiit-auth-change', syncSession);
    };
  }, [fetchPosts]);

  const requestSignIn = () => {
    setPageNotice('Please use Sign Up in the navigation to join the discussion.');
  };

  const handleAddAnswer = async (event, postId) => {
    event.preventDefault();
    if (!session?.token) {
      requestSignIn();
      return;
    }

    const text = answerInputs[postId]?.trim();
    if (!text) return;

    setPageError('');
    setPageNotice('');
    setSubmittingAnswer(postId);
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/answers`,
        { text },
        { headers: { Authorization: `Bearer ${session.token}` } },
      );
      setPosts((current) =>
        current.map((post) =>
          post._id === postId
            ? { ...post, answers: [...(post.answers || []), response.data] }
            : post,
        ),
      );
      setAnswerInputs((current) => ({ ...current, [postId]: '' }));
    } catch (error) {
      setPageError(getErrorMessage(error, 'Could not add your answer. Please try again.'));
    } finally {
      setSubmittingAnswer(null);
    }
  };

  const handleDeletePost = async (post) => {
    if (!session?.token) {
      requestSignIn();
      return;
    }
    if (!window.confirm(`Delete "${post.title}"? This will also delete its answers.`)) {
      return;
    }

    setPageError('');
    setPageNotice('');
    setDeletingId(post._id);
    try {
      await axios.delete(`${API_URL}/${post._id}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      setPosts((current) => current.filter((item) => item._id !== post._id));
    } catch (error) {
      setPageError(getErrorMessage(error, 'Could not delete the question. Please try again.'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAnswer = async (postId, answer) => {
    if (!session?.token) {
      requestSignIn();
      return;
    }
    if (!window.confirm('Delete this answer? This cannot be undone.')) return;

    setPageError('');
    setPageNotice('');
    try {
      await axios.delete(`${API_URL}/${postId}/answers/${answer._id}`, {
        headers: { Authorization: `Bearer ${session.token}` },
      });
      setPosts((current) =>
        current.map((post) =>
          post._id === postId
            ? { ...post, answers: post.answers.filter((item) => item._id !== answer._id) }
            : post,
        ),
      );
    } catch (error) {
      setPageError(getErrorMessage(error, 'Could not delete the answer. Please try again.'));
    }
  };

  const canManage = (author) =>
    Boolean(
      session?.user?.role === 'admin' ||
      (author &&
        session?.user?.id &&
        (author._id === session.user.id || author === session.user.id)),
    );

  return (
    <main className="discussion-page">
      <section className="discussion-hero">
        <div className="discussion-hero__glow" aria-hidden="true" />
        <div className="discussion-shell discussion-hero__inner">
          <div>
            <p className="discussion-eyebrow">
              <span className="discussion-eyebrow__dot" />
              A space for student voices
            </p>
            <h1>
              Ask away.
              <br />
              <span>We’re listening.</span>
            </h1>
            <p className="discussion-hero__intro">
              Bring a question, share what you know, and learn from the
              perspectives around you. Good conversations start with one voice.
            </p>
            <button
              className="discussion-button discussion-button--light"
              onClick={() => {
                if (!session?.token) {
                  requestSignIn();
                  return;
                }
                setPageNotice('');
                setShowModal(true);
              }}
              type="button"
            >
              <Plus size={17} /> Ask the community
            </button>
          </div>
          <div className="discussion-hero-art" aria-hidden="true">
            <div className="discussion-hero-art__orbit" />
            <div className="discussion-hero-art__bubble discussion-hero-art__bubble--back">
              <i /><i />
            </div>
            <div className="discussion-hero-art__bubble discussion-hero-art__bubble--front">
              <i /><i /><i />
            </div>
            <div className="discussion-hero-art__center">
              <MessageCircle size={34} />
              <span>YOUR VOICE</span>
            </div>
            <Sparkles className="discussion-hero-art__sparkle" size={27} />
            <span className="discussion-hero-art__caption">Curiosity brings us together</span>
          </div>
        </div>
      </section>

      <section className="discussion-content">
        <div className="discussion-shell">
          <div className="discussion-heading">
            <div>
              <p className="discussion-eyebrow discussion-eyebrow--green">
                The student forum
              </p>
              <h2>
                Every good answer
                <br />
                <span>starts somewhere.</span>
              </h2>
            </div>
            <div className="discussion-heading__count">
              <MessageSquareText size={17} />
              <span>{posts.length} {posts.length === 1 ? 'question' : 'questions'}</span>
            </div>
          </div>

          {(pageError || pageNotice) && (
            <div className={`discussion-alert${pageError ? ' discussion-alert--error' : ''}`} role={pageError ? 'alert' : 'status'}>
              <span>{pageError || pageNotice}</span>
              {!session?.token && (
                <Link to="/howitworks">How it works <span aria-hidden="true">↗</span></Link>
              )}
            </div>
          )}

          {loading ? (
            <div className="discussion-state" role="status">
              <span className="discussion-spinner" />
              <p>Loading conversations…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="discussion-empty">
              <span className="discussion-empty__icon"><MessageCircle size={28} /></span>
              <p className="discussion-empty__eyebrow">A fresh start</p>
              <h3>No questions yet.</h3>
              <p>Start the first conversation and make it easier for someone else to join in.</p>
              <button
                className="discussion-button discussion-button--green"
                onClick={() => {
                  if (!session?.token) {
                    requestSignIn();
                    return;
                  }
                  setPageNotice('');
                  setShowModal(true);
                }}
                type="button"
              >
                <Plus size={17} /> Ask the first question
              </button>
            </div>
          ) : (
            <div className="discussion-list">
              {posts.map((post) => (
                <article className="discussion-card" key={post._id}>
                  <div className="discussion-card__topline">
                    <div className="discussion-author">
                      <span className="discussion-author__avatar">
                        {(post.authorId?.name || 'K').charAt(0).toUpperCase()}
                      </span>
                      <span>
                        <strong>{post.authorId?.name || 'KIIT student'}</strong>
                        <small>
                          {post.authorId?.department || 'Campus community'}
                          {post.timestamp && ` · ${new Date(post.timestamp).toLocaleDateString()}`}
                        </small>
                      </span>
                    </div>
                    {canManage(post.authorId) && (
                      <button
                        aria-label={`Delete question: ${post.title}`}
                        className="discussion-delete"
                        disabled={deletingId === post._id}
                        onClick={() => handleDeletePost(post)}
                        type="button"
                      >
                        <Trash2 size={15} />
                        <span>{deletingId === post._id ? 'Deleting…' : 'Delete'}</span>
                      </button>
                    )}
                  </div>

                  <h3 className="discussion-card__title">{post.title}</h3>
                  <p className="discussion-card__body">{post.content}</p>

                  {post.tags?.length > 0 && (
                    <div className="discussion-tags">
                      {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}

                  <div className="discussion-answers">
                    <div className="discussion-answers__heading">
                      <span><MessageSquareText size={15} /> Answers</span>
                      <span>{post.answers?.length || 0}</span>
                    </div>
                    {post.answers?.length ? (
                      <div className="discussion-answer-list">
                        {post.answers.map((answer) => (
                          <div className="discussion-answer" key={answer._id}>
                            <span className="discussion-answer__avatar">
                              {(answer.postedBy?.name || 'K').charAt(0).toUpperCase()}
                            </span>
                            <div className="discussion-answer__content">
                              <div className="discussion-answer__meta">
                                <strong>{answer.postedBy?.name || 'KIIT student'}</strong>
                                {answer.createdAt && (
                                  <small>{new Date(answer.createdAt).toLocaleDateString()}</small>
                                )}
                              </div>
                              <p>{answer.text}</p>
                            </div>
                            {canManage(answer.postedBy) && (
                              <button
                                aria-label="Delete answer"
                                className="discussion-answer__delete"
                                onClick={() => handleDeleteAnswer(post._id, answer)}
                                type="button"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="discussion-no-answers">No answers yet. You could be the first.</p>
                    )}

                    <form
                      className="discussion-reply-form"
                      onSubmit={(event) => handleAddAnswer(event, post._id)}
                    >
                      <input
                        aria-label={`Write an answer to ${post.title}`}
                        maxLength={2000}
                        onChange={(event) =>
                          setAnswerInputs((current) => ({
                            ...current,
                            [post._id]: event.target.value,
                          }))
                        }
                        placeholder={session?.token ? 'Share a helpful answer…' : 'Sign up to share an answer'}
                        value={answerInputs[post._id] || ''}
                      />
                      <button
                        aria-label="Post answer"
                        disabled={submittingAnswer === post._id || !answerInputs[post._id]?.trim()}
                        type="submit"
                      >
                        <Send size={16} />
                        <span>{submittingAnswer === post._id ? 'Sending…' : 'Reply'}</span>
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <QuestionModal
          onClose={() => setShowModal(false)}
          onQuestionCreated={async () => {
            setShowModal(false);
            await fetchPosts();
          }}
          token={session?.token}
        />
      )}
    </main>
  );
}

export default DiscussionPage;
