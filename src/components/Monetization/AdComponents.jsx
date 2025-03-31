import React, { useEffect, useRef, useState } from 'react';

export const AdSenseAd = ({ slot, format = 'auto' }) => {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (adRef.current && !isAdLoaded.current) {
      try {
        // Simply push an empty object to initialize this specific ad
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        isAdLoaded.current = true;
        setIsLoading(false);
      } catch (err) {
        console.error('AdSense initialization error:', err);
        setHasError(true);
        setIsLoading(false);
      }
    }

    // Cleanup function
    return () => {
      isAdLoaded.current = false;
    };
  }, []);

  return (
    <div className="ad-container">
      {isLoading && (
        <div className="ad-placeholder">
          Advertisement
        </div>
      )}
      {hasError && (
        <div className="ad-error">
          Advertisement unavailable
        </div>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: isLoading ? 'none' : 'block',
          opacity: isLoading ? 0 : 1,
        }}
        data-ad-client="ca-pub-6624079349413852"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export const BuyMeCoffee = () => {
  return (
    <div className="bmc-button-container">
      <script 
        type="text/javascript" 
        src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" 
        data-name="bmc-button" 
        // data-slug="Techiescript" 
        data-slug="adeoyesodev" 
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

// Usage example component
export const AdDisplay = () => {
  return (
    <>
      {/* Top ad */}
      <div className="ad-wrapper top-ad">
        <AdSenseAd 
          slot="8222238390" 
          format="auto"
        />
      </div>

      {/* Sidebar ad */}
      <div className="ad-wrapper sidebar-ad">
        <AdSenseAd
          slot="8222238390" 
          format="rectangle"
        />
      </div>
    </>
  );
};

// Add styles
const styles = `
  .ad-container {
    width: 100%;
    margin: 10px 0;
    min-height: 50px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ad-wrapper {
    margin: 15px 0;
  }

  .top-ad {
    width: 100%;
    max-width: 728px;
    margin: 0 auto;
  }

  .sidebar-ad {
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 768px) {
    .ad-container {
      overflow: hidden;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
