import React, { createContext, useContext, useState } from 'react';

const PageTitleContext = createContext();

export const usePageTitleContext = () => useContext(PageTitleContext);

export const PageTitleProvider = ({ children }) => {
  const [currentPageHeader, setCurrentPageHeader] = useState('');

  return (
    <PageTitleContext.Provider value={{ currentPageHeader, setCurrentPageHeader }}>
      {children}
    </PageTitleContext.Provider>
  );
}; 