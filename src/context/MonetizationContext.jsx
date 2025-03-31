import React, { createContext, useState, useEffect } from 'react';

export const MonetizationContext = createContext();

export const MonetizationProvider = ({ children }) => {
  const [userConsent, setUserConsent] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  // Initialize analytics and tracking
  useEffect(() => {
    if (userConsent) {
      // Initialize Google Analytics
      initializeAnalytics();
      // Initialize other tracking services
    }
  }, [userConsent]);

  const initializeAnalytics = () => {
    // Google Analytics initialization code
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-B8DRE6D7JR');
  };

  const trackEvent = (category, action, label) => {
    if (analyticsEnabled && window.gtag) {
      window.gtag('event', action, {
        'event_category': category,
        'event_label': label
      });
    }
  };

  return (
    <MonetizationContext.Provider value={{
      userConsent,
      setUserConsent,
      trackEvent
    }}>
      {children}
    </MonetizationContext.Provider>
  );
}; 