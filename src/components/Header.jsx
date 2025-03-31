import React from 'react';
import { usePageTitleContext } from '../context/PageTitleContext';
import { assets } from "../assets/assets";

const Header = () => {
  const { currentPageHeader } = usePageTitleContext();

  return (
    <>
        <div className="overall_navbar nav">
        <p className="mb-0">{currentPageHeader}</p>

        <div>
          {/* <button></button> */}
          {/* <img src={assets.user_icon} alt="" /> */}
          <img src={assets.chat_user} alt="" />
        </div>
      </div>
    </>
    // <header className="app-header">
    //   <h1>{currentPageHeader}</h1>
    // </header>
  );
};

export default Header; 