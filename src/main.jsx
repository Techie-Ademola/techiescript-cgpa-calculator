import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import "./index.css";
import App from "./AppComponents/cgpa/App.jsx";
import { Toaster } from "sonner";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BottomNav from "./AppComponents/BottomNavbar.jsx";
import CalcPage from "./AppComponents/calces/Calculator.jsx";
import ChatPage from "./AppComponents/chat/ChatScreen.jsx";
import NotesPage from "./AppComponents/notes/App.jsx";
import ContextProvider from './context/Context.jsx'

createRoot(document.getElementById("root")).render(
  <ContextProvider>
  <StrictMode>
    <Router>
      <Toaster position="top-center" visibleToasts={1} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculator" element={<CalcPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/archived" element={<NotesPage />} />
      </Routes>
      {/* <App /> */}
      <BottomNav />
    </Router>
  </StrictMode>
  </ContextProvider>
);




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
