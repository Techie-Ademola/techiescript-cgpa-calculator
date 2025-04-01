import React, { useEffect, useRef, useState } from 'react';

export const AdSenseAd = ({ slot, format = 'auto' }) => {
  const adRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [adKey, setAdKey] = useState(0); // Add key to force re-render when needed

  useEffect(() => {
    let mounted = true;
    const currentAdRef = adRef.current;

    const initAd = async () => {
      try {
        if (!mounted || !currentAdRef) return;

        // Wait for AdSense to be ready
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
        }

        // Clear previous ad if any
        currentAdRef.innerHTML = '';
        
        // Initialize new ad
        await new Promise((resolve, reject) => {
          try {
            window.adsbygoogle.push({});
            resolve();
          } catch (error) {
            reject(error);
          }
        });

        if (mounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('AdSense initialization error:', err);
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
          // Force re-render on error
          setAdKey(prev => prev + 1);
        }
      }
    };

    // Initialize ad after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initAd();
    }, 100);

    // Cleanup function
    return () => {
      mounted = false;
      clearTimeout(timer);
      if (currentAdRef) {
        currentAdRef.innerHTML = '';
      }
    };
  }, [slot, format, adKey]); // Include adKey in dependencies

  return (
    <div className="ad-container" key={adKey}>
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
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '100px',
          width: '100%',
          textAlign: 'center',
          background: isLoading ? '#f1f1f1' : 'transparent'
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
    margin: 20px 0;
    min-height: 100px;
    position: relative;
  }

  .ad-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f1f1;
    color: #666;
    font-size: 14px;
  }

  .ad-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff0f0;
    color: #666;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .ad-container {
      margin: 10px 0;
    }
  }
`;

// Add styles to document
if (!document.getElementById('ad-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = 'ad-styles';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
