import React, { useState } from 'react';
import { useContext } from 'react';
import { MonetizationContext } from '../../context/MonetizationContext';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);
  const { setUserConsent } = useContext(MonetizationContext);

  const acceptCookies = () => {
    setUserConsent(true);
    setVisible(false);
    localStorage.setItem('cookieConsent', 'true');
  };

  if (!visible || localStorage.getItem('cookieConsent')) return null;

  return (
    <div className="cookie-consent">
      <p>We use cookies to improve your experience and for analytics.</p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
};

export default CookieConsent; 