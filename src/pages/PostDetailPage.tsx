/**
 * Post detail page (code walkthrough). Dynamic route /post/:id.
 * Fetches one document with getDoc (GET). Shows loading skeleton, not-found, or full post with avatar and formatted date.
 */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "../hooks/useTitle";
import { db } from "../firebase/config";
import { Avatar } from "../components";
import { formatPostDate } from "../lib/formatDate";
import type { Post } from "../types";

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  useTitle(post ? post.title : "Post");

  // Firestore getDoc: fetch a single document by id; id comes from route params
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const docRef = doc(db, "posts", id);
    getDoc(docRef)
      .then((snap) => {
        if (snap.exists()) {
          setPost({ ...snap.data(), id: snap.id } as Post);
        } else {
          setPost(null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="flex-1 px-4 py-8 max-w-3xl mx-auto">
        <div className="h-6 w-32 bg-stone-200 rounded animate-pulse mb-6" />
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="h-8 w-3/4 bg-stone-200 rounded animate-pulse mb-4" />
          <div className="flex items-center gap-3 mb-4 min-h-[40px]">
            <div className="w-10 h-10 rounded-full bg-stone-200 animate-pulse shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-stone-100 rounded animate-pulse mb-1" />
              <div className="h-3 w-24 bg-stone-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-stone-100 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-stone-100 rounded animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="flex-1 px-4 py-8 text-center">
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

  const dateStr = formatPostDate(post.createdAt);

  return (
    <section className="flex-1 px-4 py-8 max-w-7xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-stone-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} /> Back to Home
      </Link>
      <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-stone-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 mb-4">
          <Avatar
            src={post.author.photoURL}
            alt={post.author.name}
            seed={post.author.id}
            size={40}
          />
          <div>
            <p className="font-medium text-stone-800">{post.author.name}</p>
            {dateStr && <p className="text-sm text-stone-500">{dateStr}</p>}
          </div>
        </div>
        <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
          {post.description}
        </p>
      </article>
    </section>
  );
}
