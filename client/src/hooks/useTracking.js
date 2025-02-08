import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/pageview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: location.pathname,
            referrer: document.referrer,
            utmParams: Object.fromEntries(new URLSearchParams(location.search))
          })
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location]);
};