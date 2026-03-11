/**
 * PostCard: one blog post in the list (code walkthrough).
 * Shows title (link to detail), description, author avatar+name, date, and for author only: edit link + delete. toggle/setToggle refresh the list after delete.
 */
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { Trash2, Pencil, ExternalLink } from "lucide-react";
import { auth, db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { Avatar } from "./Avatar";
import { formatPostDate } from "../lib/formatDate";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

export function PostCard({ post, toggle, setToggle }: PostCardProps) {
  const { id, title, description, author, createdAt } = post;
  const { isAuth } = useAuth();
  const { showToast } = useToast();
  const canDelete = isAuth && auth.currentUser && author.id === auth.currentUser.uid;
  const canEdit = canDelete;
  const dateStr = formatPostDate(createdAt);

  /** Firestore: delete document then flip toggle so parent refetches list */
  async function handleDelete() {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    showToast({ type: "success", title: "Post deleted successfully" });
    setToggle(!toggle);
  }

  return (
    <article className="rounded-xl p-5 shadow-sm border border-stone-200 bg-white my-4 mx-1 min-h-[180px] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2 min-h-[28px]">
        <h2 className="text-xl font-semibold text-stone-900 flex-1 min-w-0">
          <Link to={`/post/${id}`} className="hover:text-blue-600 hover:underline">
            {title}
          </Link>
        </h2>
        <Link
          to={`/post/${id}`}
          className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-blue-600 shrink-0"
          aria-label="View post"
        >
          <ExternalLink size={14} aria-hidden /> Detail
        </Link>
      </div>
      <p className="text-base my-3 text-stone-600 leading-relaxed line-clamp-3 min-h-[72px]">{description}</p>
      <div className="flex flex-wrap items-center justify-between gap-2 my-3 text-sm min-h-[32px]">
        <div className="flex items-center gap-2">
          <Avatar src={author.photoURL} alt={author.name} seed={author.id} size={32} />
          <span className="font-medium text-stone-800">{author.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {dateStr && <span className="text-stone-500">{dateStr}</span>}
          {canEdit && (
            <Link
              to={`/post/${id}/edit`}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-blue-600 p-1 rounded"
              aria-label="Edit post"
            >
              <Pencil size={16} aria-hidden />
            </Link>
          )}
          {canDelete && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleDelete}
              onKeyDown={(e) => e.key === "Enter" && handleDelete()}
              className="inline-flex items-center gap-1 text-red-600 cursor-pointer p-1 rounded hover:bg-red-50 transition-colors"
              aria-label="Delete post"
            >
              <Trash2 size={16} aria-hidden />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
