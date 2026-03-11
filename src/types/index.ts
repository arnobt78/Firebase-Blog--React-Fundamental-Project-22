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
