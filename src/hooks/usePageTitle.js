import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageTitleContext } from '../context/PageTitleContext';

const usePageTitle = () => {
  const location = useLocation();
  const { setCurrentPageHeader } = usePageTitleContext();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'CGPA Calculator';
      case '/calculator':
        return 'Scientific Calculator';
      case '/chat':
        return 'AI Chat Assistant';
      case '/notes':
        return 'Notes Manager';
      case '/archived':
        return 'Archived Notes';
      default:
        return 'AcademIQ Ease';
    }
  };

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = `AcademIQ Ease | ${pageTitle}`;
    setCurrentPageHeader(pageTitle);
  }, [location, setCurrentPageHeader]);
};

export default usePageTitle; 