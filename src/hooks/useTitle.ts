import { useEffect } from 'react';

/**
 * Sets the document title. Useful for accessibility and browser tab labels.
 * @param title - The page title (e.g. "Home", "Create Post")
 */
export function useTitle(title: string): null {
  useEffect(() => {
    document.title = `${title} - Firebase Blog`;
  }, [title]);
  return null;
}
