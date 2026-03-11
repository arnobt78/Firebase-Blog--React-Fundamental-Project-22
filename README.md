# Blog Writing - React, Vite, TypeScript, Firebase, TailwindCSS Fundamental Project 22

- **Live Demo:** []()

---

## Table of Contents

- [Project Summary](#project-summary)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Install Dependencies](#install-dependencies)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Run the Application](#run-the-application)
  - [Build & Deployment](#build--deployment)
- [Application Walkthrough](#application-walkthrough)
- [Core Components & Key Files](#core-components--key-files)
- [API & Firebase Usage](#api--firebase-usage)
- [Routing & Protected Routes](#routing--protected-routes)
- [Examples](#examples)
- [Deployment Notes](#deployment-notes)
- [Learning Purpose](#learning-purpose)
- [Keywords](#keywords)
- [Conclusion](#conclusion)
- [Happy Coding!](#happy-coding)

---

## Features

- **Google Authentication:** Secure login with Google using Firebase Auth.
- **Create, Read, and Delete Blog Posts:** Interact with Firestore DB in real time.
- **Responsive UI:** Built with TailwindCSS, custom CSS, and skeleton loaders.
- **Protected Routes:** Only authenticated users can create posts.
- **Environment Variables:** Secure API keys and sensitive config.
- **Fast Deployment:** Easily deployed to Netlify.
- **Code Splitting & Progressive Web App** (PWA) ready via React best practices.

---

## Project Structure

```
BlogWriting-Firebase--ReactJS/
│
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   │   └── useTitle.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── PostCard.js
│   │   └── SkeletonCard.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── CreatePost.js
│   │   └── PageNotFound.js
│   └── routes/
│       ├── AllRoutes.js
│       └── ProtectedRoutes.js
├── .env.example
├── package.json
└── README.md
```

_Note: Only top-level and key files listed. More files may exist. [View all files on GitHub ›](https://github.com/arnobt78/BlogWriting-Firebase--ReactJS)_

---

## Technologies Used

- **ReactJS** (with hooks)
- **Firebase** (Firestore, Auth, Google Provider)
- **React Router DOM**
- **TailwindCSS**
- **React Loading Skeleton**
- **JavaScript (ES6+)**
- **HTML & CSS**
- **Netlify** (Deployment)

---

## Getting Started

### Install Dependencies

Run in the project folder:

```sh
npm install
```

Installs all required packages listed in `package.json`.

---

### Setup Environment Variables

Create a `.env` file in the root directory and provide your Firebase credentials:

```env
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_PROJECT_ID=your_firebase_project_id
REACT_APP_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_APP_ID=your_firebase_app_id
```

_Never commit your `.env` file!_

---

### Run the Application

For development:

```sh
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

---

### Build & Deployment

To build for production:

```sh
npm run build
```

To deploy on Netlify:

- Connect your GitHub repo in Netlify.
- Set environment variables under **Site settings > Build & deploy > Environment > Environment variables**
- Deploy!

For more details, see [Netlify Docs](https://docs.netlify.com/configure-builds/environment-variables/).

---

## Application Walkthrough

1. **Homepage:** Displays a list of blog posts from Firestore, with skeleton loaders for smooth UX.
2. **Authentication:** Users can log in with Google. Only logged-in users can create posts.
3. **Create Post:** Authenticated users can add a new blog post, which is immediately stored in Firestore.
4. **Delete Post:** Authenticated users can delete their own posts.
5. **Routing:** Uses React Router for navigation and protected routes for authenticated actions.
6. **UX:** Responsive design, clean UI, and loading skeletons.

---

## Core Components & Key Files

### Main App Structure

```javascript
// src/App.js
import { Header, Footer } from "./components";
import { AllRoutes } from "./routes/AllRoutes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
}
export default App;
```

---

### Firebase Configuration

```javascript
// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
```

---

### Homepage - Fetching and Displaying Posts

```javascript
// src/pages/HomePage.js
import { useEffect, useState, useRef } from "react";
import { useTitle } from "../hooks/useTitle";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { PostCard, SkeletonCard } from "../components";

export const HomePage = () => {
  const [posts, setPosts] = useState(new Array(2).fill(false));
  const [toggle, setToggle] = useState(false);
  useTitle("Home");
  const postsRef = useRef(collection(db, "posts"));

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postsRef.current);
      setPosts(
        data.docs.map((document) => ({ ...document.data(), id: document.id })),
      );
    }
    getPosts();
  }, [postsRef, toggle]);

  return (
    <section>
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
    </section>
  );
};
```

---

## API & Firebase Usage

- **Firestore:** Stores blog posts in a `posts` collection.
- **Firebase Auth:** Handles Google authentication for users.
- **Environment Variables:** Used for Firebase config (see `.env.example`).
- **No backend server:** All data managed via Firebase services.

---

## Routing & Protected Routes

- **AllRoutes.js:** Sets up main routes using React Router.
- **ProtectedRoutes.js:** Ensures only authenticated users can access certain routes (like creating posts).

---

## Examples

### Example: Creating a Post

1. Login with Google.
2. Navigate to `/create`.
3. Fill in the title and description.
4. Submit to save the post in Firestore.

### Example: Deleting a Post

- Only the author can delete their own post, which removes it from Firestore.

---

## Deployment Notes

- **Netlify:** Connect repo, set env variables, deploy.
- **Domain:** Add Netlify domain to Firebase Auth's authorized domains.
- **404 Handling:** Redirect rules needed for SPA. See [Netlify Docs](https://www.netlify.com/blog/2019/01/16/redirect-rules-for-all-how-to-configure-redirects-for-your-static-site/).

---

## Learning Purpose

- **Firebase Integration:** Learn to connect React with Firebase Auth & Firestore.
- **React Hooks:** Use hooks for state, effect, and custom logic.
- **Modern CSS:** Use TailwindCSS and custom styles for responsive design.
- **Deployment:** Understand how to deploy modern React apps with environment variables.

---

## Keywords

ReactJS, Firebase, Firestore, Authentication, Google Auth, Blog Platform, CRUD, Netlify, TailwindCSS, React Router, Protected Routes, Skeleton Loader, Environment Variables, PWA, Deployment

---

## Conclusion

This project is a hands-on, practical way to learn Firebase and React integration for real-world applications. It covers all modern best practices: authentication, CRUD operations, responsive UI, and serverless deployment. Clone, run, and extend it for your learning or next portfolio project!

---

## Happy Coding! 🚀

Thank you for exploring this project! If you have any questions or want to contribute, feel free to open issues or PRs.

---

```
---

## Happy Coding! 🚀

Thank you for exploring this project! If you have any questions or want to contribute, feel free to open issues or PRs.

---

```
