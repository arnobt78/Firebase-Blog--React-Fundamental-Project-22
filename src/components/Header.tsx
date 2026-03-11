import { Link, NavLink } from "react-router-dom";
import { Home, PenSquare, LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LOGO_SIZE = 40;

export function Header() {
  const { isAuth, login, loginWithTestUser, logout } = useAuth();

  return (
    <header className="min-h-[70px] h-[70px] px-4 py-2.5 border-b border-stone-200 flex justify-between items-center bg-transparent shrink-0">
      <Link to="/" className="flex items-center gap-2.5 min-w-0">
        <span
          className="shrink-0 w-10 h-10 inline-flex items-center justify-center"
          aria-hidden
        >
          <img
            src="/vite.svg"
            alt=""
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            decoding="async"
            className="w-10 h-10 object-contain block"
          />
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
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-2.5 rounded-lg text-base bg-blue-700 text-white cursor-pointer hover:bg-blue-800 transition-colors border-0"
            >
              <LogOut size={18} aria-hidden /> Logout
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={login}
              className="inline-flex items-center gap-1.5 ml-2 px-3.5 py-2.5 rounded-lg text-base bg-blue-700 text-white cursor-pointer hover:bg-blue-800 transition-colors border-0"
            >
              <LogIn size={18} aria-hidden /> Google
            </button>
            <button
              type="button"
              onClick={loginWithTestUser}
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
