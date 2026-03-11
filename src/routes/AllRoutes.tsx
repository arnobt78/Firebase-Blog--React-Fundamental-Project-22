/**
 * Route definitions (code walkthrough).
 * / = home (list posts), /create and /post/:id/edit are protected. post/:id = dynamic detail page.
 */
import { Routes, Route } from 'react-router-dom';
import { HomePage, CreatePost, PageNotFound, PostDetailPage, PostEditPage } from '../pages';
import { ProtectedRoutes } from './ProtectedRoutes';

export function AllRoutes() {
  return (
    <main className="flex-1 min-h-0 px-2 py-4 w-full max-w-7xl mx-auto">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<ProtectedRoutes><CreatePost /></ProtectedRoutes>} />
        <Route path="post/:id" element={<PostDetailPage />} />
        <Route path="post/:id/edit" element={<ProtectedRoutes><PostEditPage /></ProtectedRoutes>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}