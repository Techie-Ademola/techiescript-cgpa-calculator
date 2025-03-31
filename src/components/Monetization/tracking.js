export const trackAffiliateClick = (affiliateId) => {
  // Send tracking data to your analytics
  if (window.gtag) {
    window.gtag('event', 'affiliate_click', {
      'affiliate_id': affiliateId,
      'page_location': window.location.href
    });
  }
  
  // You can also store clicks in localStorage or send to your backend
  const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '{}');
  clicks[affiliateId] = (clicks[affiliateId] || 0) + 1;
  localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
};
