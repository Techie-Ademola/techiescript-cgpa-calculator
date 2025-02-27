import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get the current path
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "../App.css";

export default function BottomNavbar() {
  const location = useLocation(); // Get the current location
  const [activeLink, setActiveLink] = useState(location.pathname); // Set initial active link based on current path

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update active link on click
  };

  const currentRoute = window.location.pathname;

  return (
    <>
      {/* {currentRoute.includes("/notes") ||
      currentRoute.includes("/chat") ||
      currentRoute.includes("/notes") ||
      currentRoute.includes("/archived") ? (
        <div></div>
      ) : (
        <div className="author">
          Developed by <span>Techiescript 👨‍💻 </span>
        </div>
      )} */}

      {currentRoute.includes("/notes") ? (
        <Link
          to="/archived"
          className="floating_archive_btn d-flex justify-content-center align-items-center"
        >
          <i className="bi bi-archive"></i>
        </Link>
      ) : (
        <div></div>
      )}

      <div className="navigation">
        <ul>
          <li className={`list ${activeLink === "/" ? "active" : ""}`}>
            <Link to="/" onClick={() => handleLinkClick("/")}>
              <span className="icon">
                <i className="bi bi-mortarboard-fill"></i>
              </span>
              <span className="text">CGPA</span>
            </Link>
          </li>
          <li
            className={`list ${activeLink === "/calculator" ? "active" : ""}`}
          >
            <Link
              to="/calculator"
              onClick={() => handleLinkClick("/calculator")}
            >
              <span className="icon">
                <i className="bi bi-calculator"></i>
              </span>
              <span className="text">CalcES</span>
            </Link>
          </li>
          <li className={`list ${activeLink === "/chat" ? "active" : ""}`}>
            <Link to="/chat" onClick={() => handleLinkClick("/chat")}>
              <span className="icon">
                <i className="bi bi-chat-quote"></i>
              </span>
              <span className="text">Chat AI</span>
            </Link>
          </li>
          <li
            className={`list ${
              activeLink === "/notes" || activeLink === "/archived"
                ? "active"
                : ""
            }`}
          >
            <Link to="/notes" onClick={() => handleLinkClick("/notes")}>
              <span className="icon">
                <i className="bi bi-card-checklist"></i>
              </span>
              <span className="text">Notes</span>
            </Link>
          </li>

          {/* 
                <li className={`list ${activeLink === "/photos" ? "active" : ""}`}>
                    <Link to="/photos" onClick={() => handleLinkClick("/photos")}>
                        <span className="icon">
                            <i className="bi bi-chat"></i>
                        </span>
                        <span className="text">Messages</span>
                    </Link>
                </li>
                <li className={`list ${activeLink === "/settings" ? "active" : ""}`}>
                    <Link to="/settings" onClick={() => handleLinkClick("/settings")}>
                        <span className="icon">
                            <i className="bi bi-gear"></i>
                        </span>
                        <span className="text">Settings</span>
                    </Link>
                </li> */}
          <div className="indicator"></div>
        </ul>
      </div>
    </>
  );
}
