/**
 * Create post page (code walkthrough). Protected route.
 * Form submits to Firestore via addDoc (POST). Author and createdAt come from auth.currentUser and serverTimestamp().
 * Title and description are controlled inputs so character counts update instantly (learning: useState + onChange).
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenLine, Lightbulb } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useTitle } from "../hooks/useTitle";
import { useToast } from "../contexts/ToastContext";
import { db, auth } from "../firebase/config";

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 600;

export function CreatePost() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useTitle("Create Post");
  const postRef = collection(db, "posts");

  /** Firestore addDoc: creates a new document in "posts" with auto-generated id; serverTimestamp() sets server-side created time */
  async function handleCreatePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const document = {
      title: title.trim(),
      description: description.trim(),
      author: {
        name: user.displayName ?? "Anonymous",
        id: user.uid,
        photoURL: user.photoURL ?? null,
      },
      createdAt: serverTimestamp(),
    };
    await addDoc(postRef, document);
    showToast({
      type: "success",
      title: "Post created",
      message: "Your new post is live.",
    });
    navigate("/");
  }

  return (
    <section className="flex-1 px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6 p-5 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-2">
          <Lightbulb size={18} aria-hidden />
          Educational tip
        </div>
        <p className="text-stone-600 text-sm leading-relaxed">
          This form uses controlled inputs and Firebase{" "}
          <code className="bg-amber-100 px-1 rounded">addDoc</code> to save a
          new document to the &quot;posts&quot; collection. The author is taken
          from the logged-in user.
        </p>
      </div>

      <div className="text-center mb-8">
        <h1 className="inline-flex items-center gap-2 text-2xl font-bold text-stone-900">
          <PenLine size={28} aria-hidden />
          Add New Post
        </h1>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleCreatePost}>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write your post title here..."
            maxLength={TITLE_MAX}
            required
            className="w-full text-md py-3 px-4 rounded-lg border border-stone-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
          />
          <p
            className="mt-1 text-right text-sm text-stone-500"
            aria-live="polite"
          >
            {title.length}/{TITLE_MAX}
          </p>
        </div>
        <div>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your post description here..."
            maxLength={DESCRIPTION_MAX}
            required
            rows={10}
            className="w-full text-md py-3 px-4 rounded-lg border border-stone-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y min-h-[200px] transition-shadow"
          />
          <p
            className="mt-1 text-right text-sm text-stone-500"
            aria-live="polite"
          >
            {description.length}/{DESCRIPTION_MAX}
          </p>
        </div>
        <button
          type="submit"
          className="w-fit py-2 px-4 rounded-lg text-md font-medium bg-green-600 text-white border-0 cursor-pointer hover:bg-green-700 transition-colors items-right justify-end"
        >
          Create post
        </button>
      </form>
    </section>
  );
}
