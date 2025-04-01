import React, { useEffect, useRef, useState } from 'react';

export const AdSenseAd = ({ slot, format = 'auto' }) => {
  const adRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const initializationAttempted = useRef(false);

  useEffect(() => {
    let timeoutId;

    const initAd = async () => {
      // Prevent multiple initialization attempts
      if (initializationAttempted.current) return;
      initializationAttempted.current = true;

      try {
        // Ensure the container has dimensions before initializing
        if (adRef.current && adRef.current.offsetWidth > 0) {
          // Clear any existing ad
          while (adRef.current.firstChild) {
            adRef.current.removeChild(adRef.current.firstChild);
          }

          // Initialize new ad
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setIsLoading(false);
        } else {
          // If container width is 0, retry after a delay
          timeoutId = setTimeout(initAd, 1000);
        }
      } catch (err) {
        console.error('AdSense initialization error:', err);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Wait for the DOM to be ready
    if (document.readyState === 'complete') {
      initAd();
    } else {
      window.addEventListener('load', initAd);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', initAd);
    };
  }, [slot, format]); // Remove adKey dependency

  return (
    <div className="ad-container">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '250px', // Increased minimum height
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          background: isLoading ? '#f1f1f1' : 'transparent'
        }}
        data-ad-client="ca-pub-6624079349413852"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      {isLoading && (
        <div className="ad-placeholder">
          Advertisement Loading...
        </div>
      )}
      {hasError && (
        <div className="ad-error">
          Advertisement unavailable
        </div>
      )}
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

// Updated styles
const styles = `
  .ad-container {
    width: 100%;
    margin: 20px 0;
    min-height: 250px;
    position: relative;
    overflow: hidden;
    background: #f1f1f1;
  }

  .ad-placeholder,
  .ad-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 14px;
    z-index: 1;
  }

  .ad-error {
    background: rgba(255, 0, 0, 0.1);
  }

  .adsbygoogle {
    z-index: 2;
    position: relative;
  }

  @media (max-width: 768px) {
    .ad-container {
      margin: 10px 0;
    }
  }
`;

// Update AdDisplay component to use different formats and sizes
export const AdDisplay = () => {
  return (
    <>
      {/* Responsive ad */}
      <div className="ad-wrapper top-ad">
        <AdSenseAd 
          slot="8222238390" 
          format="auto"
        />
      </div>

      {/* Rectangle ad with specific size */}
      <div className="ad-wrapper sidebar-ad">
        <AdSenseAd
          slot="8222238391" // Use a different slot ID for different ad units
          format="rectangle"
        />
      </div>
    </>
  );
};

// Add styles to document (keep existing code)
if (!document.getElementById('ad-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'ad-styles';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
