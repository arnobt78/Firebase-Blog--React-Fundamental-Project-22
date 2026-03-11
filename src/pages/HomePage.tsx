import { useEffect, useState, useRef } from "react";
import { getDocs, collection, CollectionReference } from "firebase/firestore";
import { BookOpen, Inbox } from "lucide-react";
import { useTitle } from "../hooks/useTitle";
import { db } from "../firebase/config";
import { PostCard, SkeletonCard } from "../components";
import type { Post } from "../types";

export function HomePage() {
  const [posts, setPosts] = useState<(Post | false)[]>(
    new Array(2).fill(false),
  );
  const [toggle, setToggle] = useState(false);
  useTitle("Home");
  const postsRef = useRef<CollectionReference>(collection(db, "posts"));

  useEffect(() => {
    async function getPosts() {
      const snapshot = await getDocs(postsRef.current);
      setPosts(
        snapshot.docs.map((docSnapshot) => ({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        })) as Post[],
      );
    }
    getPosts();
  }, [toggle]);

  const isLoading = posts.length > 0 && posts.every((p) => p === false);
  const isEmpty = !isLoading && posts.length === 0;
  const hasPosts =
    !isLoading && posts.length > 0 && posts.some((p) => p !== false);

  return (
    <section className="flex-1 px-4 py-6">
      <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <div className="flex items-center gap-2 text-blue-800 font-semibold text-lg mb-2">
          <BookOpen size={22} aria-hidden />
          Learn React & Firebase
        </div>
        <p className="text-stone-600 text-sm leading-relaxed">
          This is the home page. Posts are loaded from Firestore. You can create
          a post after logging in with Google. Each card shows title,
          description, and author. Try adding your first post from the Create
          page.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-2">
          {posts.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-stone-200 flex items-center justify-center mb-4">
            <Inbox size={40} className="text-stone-500" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold text-stone-800 mb-2">
            No posts yet
          </h2>
          <p className="text-stone-600 max-w-7xl mb-6">
            The feed is empty. Log in and create your first post to see it here.
            This empty state helps beginners learn conditional rendering in
            React.
          </p>
          <p className="text-sm text-stone-500">
            Click &quot;Login&quot; in the navbar, then &quot;Create&quot; to
            add a post.
          </p>
        </div>
      )}

      {hasPosts && (
        <div className="space-y-2">
          {posts.map((post, index) =>
            post ? (
              <PostCard
                key={post.id}
                post={post}
                toggle={toggle}
                setToggle={setToggle}
              />
            ) : (
              <SkeletonCard key={index} />
            ),
          )}
        </div>
      )}
    </section>
  );
}
