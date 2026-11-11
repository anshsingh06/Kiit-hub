import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import SignupDialog from './SignupDialog';

function Navbar() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const session = JSON.parse(localStorage.getItem('kiit-connect-auth') || 'null');
      return session?.token && session.user?.name ? session.user : null;
    } catch {
      return null;
    }
  });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleAuthChange = (event) => {
      setUser(event.detail);
      setShowProfile(false);
    };

    window.addEventListener('kiit-auth-change', handleAuthChange);
    return () => window.removeEventListener('kiit-auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kiit-connect-auth');
    setUser(null);
    setShowProfile(false);
  };

  const firstName = user?.name?.trim().split(/\s+/)[0];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#f8fbf6]/95 shadow-[0_4px_24px_rgba(18,61,42,0.10)] backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="KIIT Connect" className="w-8 h-8" />
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="bg-[#e4efe3] text-[#174b31] px-4 py-2 rounded-full hover:bg-[#d2e7d0] transition inline-block"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="bg-[#e4efe3] text-[#174b31] px-4 py-2 rounded-full hover:bg-[#d2e7d0] transition inline-block"
          >
            Events
          </Link>
          <Link
            to="/discussion"
            className="bg-[#e4efe3] text-[#174b31] px-4 py-2 rounded-full hover:bg-[#d2e7d0] transition inline-block"
          >
            Discussion
          </Link>
        </div>
        {user ? (
          <div className="relative">
            <button
              aria-expanded={showProfile}
              aria-haspopup="menu"
              aria-label={`Profile menu for ${user.name}`}
              className="flex items-center gap-2 rounded-full bg-[#e4efe3] py-1.5 pl-1.5 pr-3 text-[#174b31] transition hover:bg-[#d2e7d0]"
              onClick={() => setShowProfile((open) => !open)}
              type="button"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17613b] text-sm font-bold text-white">
                {firstName?.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-semibold">{firstName}</span>
            </button>
            {showProfile && (
              <div
                className="absolute right-0 top-full z-[60] mt-3 w-64 rounded-2xl border border-[#dce8dd] bg-[#f8fbf6] p-4 text-[#173b2b] shadow-xl"
                role="menu"
              >
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="mt-1 truncate text-xs text-[#63796c]">{user.email}</p>
                <button
                  className="mt-4 w-full rounded-xl bg-[#e4efe3] px-3 py-2 text-left text-sm font-semibold text-[#174b31] transition hover:bg-[#d2e7d0]"
                  onClick={handleLogout}
                  role="menuitem"
                  type="button"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowSignUp(true)}
            className="bg-[#17613b] text-white px-4 py-2 rounded-full shadow-sm hover:bg-[#123d2a] transition"
            type="button"
          >
            Sign Up
          </button>
        )}
      </nav>
      <SignupDialog
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={() => setShowSignUp(false)}
      />
    </>
  );
}

export default Navbar;
