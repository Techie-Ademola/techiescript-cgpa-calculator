import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get the current path
import { toast } from "sonner";
import swal from "sweetalert"; // Import SweetAlert
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./App.css";

export default function BottomNavbar() {
    const location = useLocation(); // Get the current location
    const [activeLink, setActiveLink] = useState(location.pathname); // Set initial active link based on current path

    const handleLinkClick = (path) => {
        setActiveLink(path); // Update active link on click
    };

    return (
        <>


<div className="author">
        Developed by <span>Techiescript 👨‍💻 </span>
      </div>
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
                <li className={`list ${activeLink === "/calculator" ? "active" : ""}`}>
                    <Link to="/calculator" onClick={() => handleLinkClick("/calculator")}>
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
                {/* <li className={`list ${activeLink === "/messages" ? "active" : ""}`}>
                    <Link to="/messages" onClick={() => handleLinkClick("/messages")}>
                        <span className="icon">
                            <i className="bi bi-book"></i>
                        </span>
                        <span className="text">Notes</span>
                    </Link>
                </li>
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