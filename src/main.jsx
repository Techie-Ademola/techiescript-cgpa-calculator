import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Home from "./Home.jsx"; // Import your Home component
import BottomNav from "./BottomNavbar.jsx"; // Import your Home component
import CalcPage from "./Calc.jsx"; // Import another page component
import ChatPage from "./Chat.jsx"; // Import another page component
import ContextProvider from './context/Context.jsx'

createRoot(document.getElementById("root")).render(
  <ContextProvider>
  <StrictMode>
    <Router>
      <Toaster position="top-center" visibleToasts={1} />
      <Routes>
        <Route path="/" element={<App />} /> {/* Home route */}
        <Route path="/calculator" element={<CalcPage />} /> {/* Another page route */}
        <Route path="/chat" element={<ChatPage />} /> {/* Another page route */}
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
