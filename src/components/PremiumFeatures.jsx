import React, { useEffect, useState } from 'react';

export const PremiumFeatureWrapper = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user has web monetization enabled
    const checkPremiumStatus = () => {
      const isPremiumUser = localStorage.getItem('premium_user') === 'true';
      setIsPremium(isPremiumUser);
    };

    checkPremiumStatus();
    window.addEventListener('storage', checkPremiumStatus);

    return () => window.removeEventListener('storage', checkPremiumStatus);
  }, []);

  if (!isPremium) {
    return (
      <div className="premium-feature-locked">
        <p>This is a premium feature</p>
        <a 
          href="#upgrade" 
          data-affiliate="premium-upgrade"
          className="premium-upgrade-link"
        >
          Upgrade to unlock
        </a>
      </div>
    );
  }

  return children;
}; 