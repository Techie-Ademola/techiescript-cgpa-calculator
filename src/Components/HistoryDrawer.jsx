import React from "react";
// import "./HistoryDrawer.css"; // Optional: Add styles for the drawer

const HistoryDrawer = ({ isOpen, onClose, history, onHistoryClick, onClearHistory }) => {
//   if (!isOpen) return null; // Don't render if not open

  return (
    <div className={`history-drawer ${isOpen ? "opened" : ""}`}>
      <div className="drawer-header">
        <h4>Calculation History</h4>
        <button onClick={onClose} className="close_drawer btn btn-sm text-white">
        <i className="bi bi-x"></i>
        </button>
      </div>
      <ul className="mt-3">
        {history.length ? history.map((item, index) => (
          <li key={index} onClick={() => onHistoryClick(item)}>
            {item.expression} = {item.result}
          </li>
        )) : <h6 className="text-center text-muted mb-0">No Calculation History</h6>}
      </ul>
      {
        history.length &&
      <button onClick={onClearHistory} className="btn btn-danger text-light">
        Clear History
      </button>
      }
    </div>
  );
};

export default HistoryDrawer;
