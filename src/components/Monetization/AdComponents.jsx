import React, { useEffect } from 'react';

export const AdSenseAd = ({ slot, format = 'auto' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-6624079349413852"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export const BuyMeCoffee = () => {
  return (
    <div className="bmc-button-container">
      <script 
        type="text/javascript" 
        src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" 
        data-name="bmc-button" 
        data-slug="Techiescript" 
        // data-slug="adeoyesodev" 
        data-color="#FFDD00" 
        data-emoji="" 
        data-font="Cookie" 
        data-text="Buy me a coffee" 
        data-outline-color="#000000" 
        data-font-color="#000000" 
        data-coffee-color="#ffffff"
      />
    </div>
  );
};
