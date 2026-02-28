import { useEffect } from "react";

interface RefTaggerProps {
  currentPage: string;
  selectedPostId?: string;
}

export function RefTagger({ currentPage, selectedPostId }: RefTaggerProps) {
  useEffect(() => {
    // Initialize RefTagger settings
    (window as any).refTagger = {
      settings: {
        bibleVersion: 'ESV'
      }
    };

    // Create and append the script
    const script = document.createElement('script');
    script.src = 'https://api.reftagger.com/v2/RefTagger.js';
    script.async = true;
    
    // Handle nonce if present (optional but good for security)
    const nonceElement = document.querySelector('[nonce]');
    const nonce = nonceElement ? (nonceElement.getAttribute('nonce') || (nonceElement as any).nonce) : null;
    if (nonce) {
      script.setAttribute('nonce', nonce);
      (window as any).refTagger.settings.nonce = nonce;
    }

    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Re-run tagging whenever the page or post changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((window as any).refTagger && typeof (window as any).refTagger.tag === 'function') {
        try {
          (window as any).refTagger.tag();
        } catch (e) {
          console.error("RefTagger error:", e);
        }
      }
    }, 500); // Small delay to ensure DOM is updated

    return () => clearTimeout(timer);
  }, [currentPage, selectedPostId]);

  return null;
}
