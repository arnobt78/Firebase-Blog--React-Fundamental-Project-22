# Blog Writing - React, Vite, TypeScript, Firebase, TailwindCSS Fundamental Project 22

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10-FFCA28)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.28-CA4245)](https://reactrouter.com/)

A beginner-friendly, educational blog application built with React, Vite, TypeScript, Firebase (Firestore & Auth), and TailwindCSS. It demonstrates full CRUD operations, Google and email/password authentication, protected routes, and reusable patterns (Context API, custom hooks, TypeScript types). Use it to learn modern React and Firebase or as a base for your own projects.

- **Live Demo:** [https://firebase-blog-writing.vercel.app/](https://firebase-blog-writing.vercel.app/)

---

## Table of Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [Technologies & Dependencies](#technologies--dependencies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How to Run & Use](#how-to-run--use)
- [Application Walkthrough](#application-walkthrough)
- [Routes](#routes)
- [Components & Reusability](#components--reusability)
- [Firebase (Backend & API)](#firebase-backend--api)
- [Key Concepts for Learners](#key-concepts-for-learners)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [License](#license)
- [Happy Coding!](#happy-coding)

---

## Project Summary

This project is a **single-page application (SPA)** that lets users read blog posts, and—when signed in—create, edit, and delete their own posts. There is **no custom backend server**: all data and authentication are handled by **Firebase** (Firestore for data, Firebase Auth for Google and email/password sign-in). The app is built with **React 18**, **TypeScript**, **Vite**, and **TailwindCSS**, and is designed for learning and reuse.

---

## Features

- **Authentication:** Google sign-in and optional test user (email/password) for development.
- **CRUD:** Create, read, update, and delete blog posts stored in Firestore.
- **Protected routes:** Only authenticated users can access Create and Edit pages.
- **Profile dropdown:** When logged in, navbar shows avatar (or RoboHash fallback) with dropdown (name, email, logout).
- **Author avatars:** Post cards and detail view show user photo or RoboHash avatar.
- **Dynamic post detail & edit:** Routes like `/post/:id` and `/post/:id/edit` with loading and not-found states.
- **Responsive UI:** TailwindCSS, Lucide icons, skeleton loaders, and layout that avoids shift on refresh.
- **TypeScript:** Typed components, hooks, and Firebase usage throughout.
- **PWA-ready:** Manifest and meta tags for install and SEO.

---

## Technologies & Dependencies

| Technology                 | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| **React 18**               | UI library; hooks for state and effects.                 |
| **TypeScript**             | Static typing for safer code and better editor support.  |
| **Vite 6**                 | Build tool and dev server; fast HMR.                     |
| **React Router 6**         | Client-side routing (e.g. `/`, `/create`, `/post/:id`).  |
| **Firebase 12**            | Firestore (database) and Auth (Google + email/password). |
| **Tailwind CSS 4**         | Utility-first styling via `@tailwindcss/vite`.           |
| **Lucide React**           | Icon set used in header, cards, and buttons.             |
| **react-loading-skeleton** | Placeholder skeletons while data loads.                  |

**Example:** Firebase is used both for persistence and auth. Firestore holds the `posts` collection; Auth handles sign-in and provides `currentUser` (e.g. for author checks and profile dropdown).

---

## Project Structure

```
firebase-blog/
├── public/
│   ├── vite.svg           # App icon / logo
│   ├── page-not-found.jpg # 404 image
│   ├── manifest.json      # PWA manifest
│   └── robots.txt
├── src/
│   ├── main.tsx           # Entry: React root, BrowserRouter, App
│   ├── App.tsx             # Layout: AuthProvider, Header, AllRoutes, Footer
│   ├── global.css          # Tailwind + base styles
│   ├── vite-env.d.ts       # Vite & env types
│   ├── components/
│   │   ├── Header.tsx      # Nav, logo, auth buttons / profile dropdown
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx    # Single post card (avatar, title, description, actions)
│   │   ├── SkeletonCard.tsx# Loading placeholder for post card
│   │   ├── Avatar.tsx      # User image or RoboHash fallback
│   │   └── index.ts
│   ├── pages/
│   │   ├── HomePage.tsx    # List posts (GET), empty state, educational banner
│   │   ├── CreatePost.tsx  # Create form (POST)
│   │   ├── PostDetailPage.tsx   # Single post (GET by id)
│   │   ├── PostEditPage.tsx     # Edit form (PUT)
│   │   ├── PageNotFound.tsx
│   │   └── index.ts
│   ├── routes/
│   │   ├── AllRoutes.tsx   # Route definitions
│   │   └── ProtectedRoutes.tsx  # Redirects unauthenticated users
│   ├── contexts/
│   │   └── AuthContext.tsx # Auth state, login/logout, test user
│   ├── hooks/
│   │   └── useTitle.ts     # Sets document title per page
│   ├── firebase/
│   │   └── config.ts       # init app, Firestore, Auth, Google provider
│   ├── lib/
│   │   └── formatDate.ts   # Format Firestore timestamp for display
│   └── types/
│       └── index.ts        # Post, PostAuthor interfaces
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .env.example            # Template for env vars
├── vercel.json             # SPA rewrites for Vercel
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js (e.g. 18+) and npm.

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd firebase-blog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment variables (optional for run, required for real Firebase)**  
   See [Environment Variables](#environment-variables) below. Without a `.env` file, the app will still build and run, but Firebase (auth and Firestore) will not work until you add your project keys.

4. **Run in development**

   ```bash
   npm run dev
   ```

   Opens at [http://localhost:5173](http://localhost:5173) (or the port Vite shows).

5. **Build for production**

   ```bash
   npm run build
   ```

   Output is in the `dist/` folder.

6. **Preview production build**

   ```bash
   npm run preview
   ```

7. **Lint**

   ```bash
   npm run lint
   ```

---

## Environment Variables

You **do not need** a `.env` file to run the app locally (e.g. to see the UI and routing). To use **Firebase** (login, read/write posts), you must create a Firebase project and provide credentials.

- **If you do not set env vars:** The app runs; Firebase calls will fail (no auth, no data).
- **Optional / learning:** You can run with no `.env` and still study the code and UI flow.

**How to get the required variables:**

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a project (or use an existing one).
3. Enable **Authentication** → Sign-in method: **Google** and **Email/Password** (the latter is used for the “Test User” flow).
4. Create a **Firestore** database (e.g. in test mode for learning).
5. In Project settings (gear) → **Your apps** → add a Web app → copy the config object.

**Create a `.env` file in the project root** (same level as `package.json`). Vite only exposes variables that start with `VITE_` to the client. Use these names:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

Copy from `.env.example` and replace the placeholder values. **Do not commit `.env`** (it is in `.gitignore`). On Vercel/Netlify, add the same variable names in the dashboard under Environment Variables.

---

## How to Run & Use

- **Development:** `npm run dev` → open the URL in the browser. Use **Google** or **Test User** to sign in (Test User requires Email/Password enabled and a user `test@user.com` / `12345678` in Firebase).
- **Create a post:** Sign in → **Create** → fill title and description → submit. You are redirected to Home and the new post appears.
- **View a post:** Click the post title or **Detail** on a card → opens `/post/:id`.
- **Edit a post:** On a post you own, click the pencil icon or go to `/post/:id/edit` → change title/description → **Save changes**.
- **Delete a post:** On your own post card, click the trash icon (only author sees it).
- **Logout:** Click the profile circle in the navbar → **Logout**.

---

## Application Walkthrough

1. **Home (`/`):** Fetches all posts from Firestore (`getDocs(collection(db, "posts"))`). Shows an educational banner, skeleton cards while loading, an empty state when there are no posts, or a list of `PostCard`s.
2. **Create (`/create`):** Protected. Form submits with `addDoc` (POST). Sends `title`, `description`, `author` (name, id, photoURL), and `createdAt: serverTimestamp()`.
3. **Post detail (`/post/:id`):** Reads one document with `getDoc(doc(db, "posts", id))`. Renders title, author (with avatar), date, and description. Handles loading and not-found.
4. **Post edit (`/post/:id/edit`):** Protected. Loads post with `getDoc`, then updates with `updateDoc` (PUT). Only the post author can edit.
5. **Delete:** From a post card, author clicks delete → `deleteDoc(doc(db, "posts", id))` and list refreshes.
6. **Auth:** `AuthContext` wraps the app and exposes `login` (Google), `loginWithTestUser`, `logout`, and `authError`. Header shows either login buttons or profile dropdown (avatar, name, email, logout).

---

## Routes

| Path             | Component      | Protection | Description      |
| ---------------- | -------------- | ---------- | ---------------- |
| `/`              | HomePage       | Public     | List all posts   |
| `/create`        | CreatePost     | Protected  | Create new post  |
| `/post/:id`      | PostDetailPage | Public     | View single post |
| `/post/:id/edit` | PostEditPage   | Protected  | Edit own post    |
| `*`              | PageNotFound   | Public     | 404 page         |

Protected routes use `ProtectedRoutes`: if the user is not authenticated, they are redirected to `/`.

---

## Components & Reusability

- **Header:** Nav links, logo, auth buttons or profile dropdown. Uses `useAuth()` and `auth.currentUser`. Reusable in any app that needs a navbar + auth.
- **Footer:** Simple footer with link and copyright. Replace content as needed.
- **PostCard:** Receives `post`, `toggle`, `setToggle`. Uses `Avatar`, `formatPostDate`, and auth to show edit/delete. Reusable for any list of posts with the same `Post` type.
- **SkeletonCard:** Same layout as PostCard (min-heights) to avoid layout shift. Use wherever you show a loading list of cards.
- **Avatar:** `src`, `alt`, `seed`, `size`. Shows image or RoboHash. Use for any user display (comments, profile, etc.).
- **AuthContext / useAuth:** Wrap the app in `AuthProvider`; use `useAuth()` for `isAuth`, `login`, `logout`, `loginWithTestUser`, `authError`, `clearAuthError`. Reusable in other React apps with Firebase Auth.

**Using in another project:** Copy the component (and its types/imports), ensure Tailwind and dependencies are installed, and adapt props or styles as needed.

---

## Firebase (Backend & API)

There are **no REST API endpoints** in this repo. The “backend” is **Firebase**:

- **Firestore:** One collection, `posts`. Each document has: `title`, `description`, `author` (object with `name`, `id`, `photoURL`), `createdAt` (timestamp). Document ID is used as post `id` in routes.
- **Firebase Auth:** Google provider and Email/Password. Used for sign-in; `auth.currentUser` gives `uid`, `displayName`, `email`, `photoURL` for the current user.

**Firestore usage in this app:**

| Operation    | Method                                                    | Example                      |
| ------------ | --------------------------------------------------------- | ---------------------------- |
| List posts   | `getDocs(collection(db, "posts"))`                        | HomePage                     |
| Get one post | `getDoc(doc(db, "posts", id))`                            | PostDetailPage, PostEditPage |
| Create post  | `addDoc(collection(db, "posts"), data)`                   | CreatePost                   |
| Update post  | `updateDoc(doc(db, "posts", id), { title, description })` | PostEditPage                 |
| Delete post  | `deleteDoc(doc(db, "posts", id))`                         | PostCard                     |

**Auth usage:** `signInWithPopup(auth, provider)`, `signInWithEmailAndPassword`, `signOut`, `onAuthStateChanged`. Config lives in `src/firebase/config.ts` and reads `import.meta.env.VITE_*`.

---

## Key Concepts for Learners

- **Context API:** `AuthContext` holds auth state and methods so Header, ProtectedRoutes, and PostCard can use them without prop drilling.
- **Custom hook:** `useTitle(title)` sets `document.title` per page for accessibility and tabs.
- **TypeScript:** `Post` and `PostAuthor` in `src/types/index.ts` describe Firestore documents; components and hooks use these types.
- **Protected routes:** A wrapper component checks auth and either renders children or redirects to `/`.
- **Layout shift prevention:** Logo and avatar areas have fixed size and background; skeleton cards use the same min-heights as real cards so the page does not jump when data loads.
- **SPA deployment:** `vercel.json` (or similar) rewrites all routes to `index.html` so client-side routing works on refresh.

---

## Keywords

React, Vite, TypeScript, Firebase, Firestore, Firebase Auth, Google Auth, Tailwind CSS, CRUD, blog, SPA, Context API, protected routes, Lucide, skeleton loader, PWA, Vercel, environment variables, educational project, Arnob Mahmud

---

## Conclusion

This project is a full-stack-feel blog with no custom backend: React + Vite + TypeScript on the front end and Firebase for data and auth. It is suitable for learning React patterns, TypeScript, and Firebase, and can be extended with more features (e.g. comments, categories, or different auth providers). Clone it, add your own `.env` from Firebase Console, and run or deploy (e.g. Vercel) to explore and build on it.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
