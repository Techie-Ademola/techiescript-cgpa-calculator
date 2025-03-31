import { trackAffiliateClick } from './tracking';

export const initializeMonetization = () => {
  // Initialize web monetization
  const monetizationTag = document.createElement('meta');
  monetizationTag.name = 'monetization';
  monetizationTag.content = 'YOUR_PAYMENT_POINTER';
  document.head.appendChild(monetizationTag);

  // Initialize affiliate tracking
  window.addEventListener('click', (e) => {
    const affiliate = e.target.closest('[data-affiliate]');
    if (affiliate) {
      trackAffiliateClick(affiliate.dataset.affiliate);
    }
  });

  // Listen for web monetization events
  if (document.monetization) {
    document.monetization.addEventListener('monetizationstart', () => {
      console.log('Monetization started');
      // Enable premium features or remove ads
      togglePremiumFeatures(true);
    });
  }
};

export const togglePremiumFeatures = (enabled) => {
  // Store premium status
  localStorage.setItem('premium_user', enabled.toString());
  
  // Toggle premium features
  const adElements = document.querySelectorAll('.ad-container');
  adElements.forEach(el => {
    el.style.display = enabled ? 'none' : 'block';
  });
};

// Add affiliate links programmatically
export const addAffiliateLinks = () => {
  const affiliateProducts = {
    'product1': 'https://affiliate.com/your-link-1',
    'product2': 'https://affiliate.com/your-link-2',
  };

  return Object.entries(affiliateProducts).map(([id, link]) => (
    `<a href="${link}" 
        data-affiliate="${id}" 
        target="_blank" 
        rel="noopener noreferrer">
      Check out ${id}
    </a>`
  )).join('');
};
