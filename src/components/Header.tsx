import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, PenSquare, LogOut, LogIn, User, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import { Avatar } from "./Avatar";

const LOGO_SIZE = 40;

export function Header() {
  const { isAuth, login, loginWithTestUser, logout, authError, clearAuthError } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentUser = auth.currentUser;
  const displayName = currentUser?.displayName ?? "User";
  const email = currentUser?.email ?? "";
  const photoURL = currentUser?.photoURL ?? null;
  const uid = currentUser?.uid ?? "";

  return (
    <header className="min-h-[70px] h-[70px] px-4 py-2.5 border-b border-stone-200 flex justify-between items-center bg-white shrink-0">
      <Link to="/" className="flex items-center gap-2.5 min-w-0">
        <span className="shrink-0 w-10 h-10 inline-flex items-center justify-center" aria-hidden>
          <img src="/vite.svg" alt="" width={LOGO_SIZE} height={LOGO_SIZE} decoding="async" className="w-10 h-10 object-contain block" />
        </span>
        <span className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis hidden sm:inline">
          Firebase Write Node Blog
        </span>
      </Link>
      <nav className="flex items-center gap-1 shrink-0">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-colors ${isActive ? "bg-stone-200 text-stone-900" : "text-stone-600 hover:bg-stone-100"}`
          }
        >
          <Home size={18} aria-hidden /> Home
        </NavLink>
        {isAuth ? (
          <>
            <NavLink
              to="/create"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-colors ${isActive ? "bg-stone-200 text-stone-900" : "text-stone-600 hover:bg-stone-100"}`
              }
            >
              <PenSquare size={18} aria-hidden /> Create
            </NavLink>
            <div className="relative ml-2" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 p-1 rounded-full border-2 border-transparent hover:border-stone-300 focus:outline-none focus:border-blue-500 transition-colors"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-label="Profile menu"
              >
                <Avatar src={photoURL} alt={displayName} seed={uid || "user"} size={36} className="ring-2 ring-stone-200" />
                <ChevronDown size={16} className="text-stone-500 hidden sm:block" aria-hidden />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg border border-stone-200 bg-white py-2 z-50">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-sm font-semibold text-stone-900 truncate">{displayName}</p>
                    {email && <p className="text-xs text-stone-500 truncate">{email}</p>}
                  </div>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/create"
                    className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Create post
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} aria-hidden /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {authError && (
              <p className="text-xs text-red-600 mr-2 max-w-[140px] truncate" title={authError}>
                {authError}
              </p>
            )}
            <button
              type="button"
              onClick={login}
              className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-2.5 rounded-lg text-base bg-blue-700 text-white cursor-pointer hover:bg-blue-800 transition-colors border-0"
            >
              <LogIn size={18} aria-hidden /> Google
            </button>
            <button
              type="button"
              onClick={() => { clearAuthError(); loginWithTestUser(); }}
              className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-2.5 rounded-lg text-base bg-stone-600 text-white cursor-pointer hover:bg-stone-700 transition-colors border-0"
            >
              <User size={18} aria-hidden /> Test User
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
