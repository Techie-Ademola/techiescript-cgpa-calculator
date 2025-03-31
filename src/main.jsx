import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import "./index.css";
import App from "./AppComponents/cgpa/App.jsx";
import Layout from "./components/Layout";
import { Toaster } from "sonner";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BottomNav from "./AppComponents/BottomNavbar.jsx";
import CalcPage from "./AppComponents/calces/Calculator.jsx";
import ChatPage from "./AppComponents/chat/ChatScreen.jsx";
import NotesPage from "./AppComponents/notes/App.jsx";
import ContextProvider from './context/Context.jsx'
import { MonetizationProvider } from './context/MonetizationContext';
import CookieConsent from './components/Monetization/CookieConsent';
import AdFooter from './components/Monetization/AdFooter';
import { initializeMonetization } from './components/Monetization/monetization';
import { PageTitleProvider } from './context/PageTitleContext';

// Create an App wrapper to handle initialization
const AppWrapper = () => {
  useEffect(() => {
    initializeMonetization();
  }, []);


  return (
    <MonetizationProvider>
      <ContextProvider>
        <PageTitleProvider>
          <StrictMode>
            <Router>
              <Toaster position="top-center" visibleToasts={1} />
              <CookieConsent />
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<App />} />
                  <Route path="/calculator" element={<CalcPage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/notes" element={<NotesPage />} />
                  <Route path="/archived" element={<NotesPage />} />
                </Route>
              </Routes>
              <BottomNav />
              <AdFooter />
            </Router>
          </StrictMode>
        </PageTitleProvider>
      </ContextProvider>
    </MonetizationProvider>
  );
};

createRoot(document.getElementById("root")).render(<AppWrapper />);




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
