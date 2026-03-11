/**
 * Post edit page (code walkthrough). Protected route, dynamic /post/:id/edit.
 * Loads post with getDoc, updates with updateDoc (PUT). Only the post author can edit; others see "You can only edit your own posts".
 */
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { useTitle } from "../hooks/useTitle";
import { useToast } from "../contexts/ToastContext";
import { db, auth } from "../firebase/config";
import type { Post } from "../types";

export function PostEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useTitle("Edit Post");

  // Load existing post for editing
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const docRef = doc(db, "posts", id);
    getDoc(docRef)
      .then((snap) => {
        if (snap.exists()) {
          const data = { ...snap.data(), id: snap.id } as Post;
          setPost(data);
          setTitle(data.title);
          setDescription(data.description);
        } else {
          setPost(null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const canEdit =
    post && auth.currentUser && post.author.id === auth.currentUser.uid;

  /** Firestore updateDoc: updates only the given fields (title, description) on the existing document */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !canEdit) return;
    setSaving(true);
    try {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, { title, description });
      showToast({ type: "success", title: "Post updated successfully" });
      navigate(`/post/${id}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="flex-1 px-4 py-8 max-w-7xl mx-auto">
        <div className="h-8 w-48 bg-stone-200 rounded animate-pulse" />
      </section>
    );
  }

  if (!post) {
    return (
      <section className="flex-1 px-4 py-8 text-center max-w-7xl mx-auto">
        <p className="text-stone-600 mb-4">Post not found.</p>
        <Link
          to="/"
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </section>
    );
  }

  if (!canEdit) {
    return (
      <section className="flex-1 px-4 py-8 text-center max-w-7xl mx-auto">
        <p className="text-stone-600 mb-4">You can only edit your own posts.</p>
        <Link
          to={`/post/${id}`}
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={18} /> View post
        </Link>
      </section>
    );
  }

  return (
    <section className="flex-1 px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-1">
          <Lightbulb size={18} aria-hidden /> PUT / Update
        </div>
        <p className="text-stone-600 text-sm">
          Editing uses Firestore{" "}
          <code className="bg-amber-100 px-1 rounded">updateDoc</code> to update
          only the title and description fields.
        </p>
      </div>
      <Link
        to={`/post/${id}`}
        className="inline-flex items-center gap-1 text-stone-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} /> Back to post
      </Link>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          maxLength={50}
          required
          className="w-full text-lg py-3 px-4 rounded-lg border border-stone-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          maxLength={600}
          required
          rows={10}
          className="w-full text-base py-3 px-4 rounded-lg border border-stone-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[200px]"
        />
        <button
          type="submit"
          disabled={saving}
          className="w-fit py-2 px-4 rounded-lg text-md font-medium bg-blue-600 text-white border-0 cursor-pointer hover:bg-blue-700 disabled:opacity-50 transition-colors items-right"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </section>
  );
}
