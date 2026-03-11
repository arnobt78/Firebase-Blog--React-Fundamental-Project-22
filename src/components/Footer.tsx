import { Link } from "react-router-dom";
import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="min-h-[70px] h-[70px] flex justify-center items-center border-t border-stone-200 bg-transparent shrink-0">
      <p className="flex items-center gap-1.5 flex-wrap justify-center text-stone-600 text-sm">
        <Link to="/" className="font-medium text-stone-900 hover:underline">
          Firebase Write Node Blog
        </Link>
        <Copyright size={16} aria-hidden /> {new Date().getFullYear()}. All
        reserved.
      </p>
    </footer>
  );
}
