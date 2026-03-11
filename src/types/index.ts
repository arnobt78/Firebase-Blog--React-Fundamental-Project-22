/**
 * Shared types for the app (code walkthrough).
 * PostAuthor matches what we store in Firestore when creating a post (from auth.currentUser).
 * Post.createdAt can be Firestore Timestamp (seconds) or ISO string depending on how it was saved.
 */

/** Author of a blog post (Firebase user display info) */
export interface PostAuthor {
  name: string;
  id: string;
  photoURL?: string | null;
}

/** Blog post document from Firestore */
export interface Post {
  id: string;
  title: string;
  description: string;
  author: PostAuthor;
  createdAt?: { seconds: number } | string | null;
}
