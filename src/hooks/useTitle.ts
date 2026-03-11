import { useEffect } from 'react';

/**
 * Custom hook: sets document.title for the current page (code walkthrough).
 * Improves accessibility and browser tab labels. Call once per page (e.g. in page components).
 * @param title - The page title (e.g. "Home", "Create Post")
 */
export function useTitle(title: string): null {
  useEffect(() => {
    document.title = `${title} - Firebase Blog`;
  }, [title]);
  return null;
}
