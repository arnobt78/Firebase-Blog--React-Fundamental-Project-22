import { Routes, Route } from 'react-router-dom';
import { HomePage, CreatePost, PageNotFound } from '../pages';
import { ProtectedRoutes } from './ProtectedRoutes';

export function AllRoutes() {
  return (
    <main className="flex-1 min-h-0 px-2 py-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="create" element={<ProtectedRoutes><CreatePost /></ProtectedRoutes>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}