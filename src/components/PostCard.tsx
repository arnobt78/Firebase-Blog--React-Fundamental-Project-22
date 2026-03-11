import { doc, deleteDoc } from 'firebase/firestore';
import { Trash2 } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  toggle: boolean;
  setToggle: (value: boolean) => void;
}

export function PostCard({ post, toggle, setToggle }: PostCardProps) {
  const { id, title, description, author } = post;
  const { isAuth } = useAuth();
  const canDelete = isAuth && auth.currentUser && author.id === auth.currentUser.uid;

  async function handleDelete() {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    setToggle(!toggle);
  }

  return (
    <article className="rounded-lg p-4 shadow-sm border border-stone-200 bg-white my-4 mx-1 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold my-4 mx-1 text-stone-900">{title}</h2>
      <p className="text-base my-4 mx-1 text-stone-600 leading-relaxed">{description}</p>
      <div className="flex justify-between items-center my-4 mx-1 text-base">
        <span className="text-sm font-medium bg-blue-50 text-blue-800 px-2.5 py-1.5 rounded-lg">{author.name}</span>
        {canDelete && (
          <span
            role="button"
            tabIndex={0}
            onClick={handleDelete}
            onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
            className="inline-flex items-center gap-1 text-red-600 cursor-pointer p-1 rounded hover:bg-red-50 transition-colors"
            aria-label="Delete post"
          >
            <Trash2 size={18} aria-hidden />
          </span>
        )}
      </div>
    </article>
  );
}