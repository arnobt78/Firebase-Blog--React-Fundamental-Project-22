import { Link } from "react-router-dom";
import { Home, FileQuestion } from "lucide-react";
import { useTitle } from "../hooks/useTitle";

export function PageNotFound() {
  useTitle("Page Not Found");

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center max-w-7xl mx-auto">
      <p className="inline-flex items-center gap-2 text-2xl font-semibold text-stone-800 mb-6">
        <FileQuestion size={32} aria-hidden />
        404 / Page Not Found
      </p>
      <div className="w-full min-h-[200px] my-4 rounded-lg overflow-hidden bg-stone-100">
        <img
          src="/page-not-found.jpg"
          alt=""
          width={500}
          height={300}
          decoding="async"
          className="w-full h-auto max-w-full object-cover block"
        />
      </div>
      <Link to="/">
        <button
          type="button"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg text-lg font-medium bg-blue-700 text-white border-0 cursor-pointer hover:bg-blue-800 transition-colors"
        >
          <Home size={20} aria-hidden />
          Back To Home
        </button>
      </Link>
    </section>
  );
}
