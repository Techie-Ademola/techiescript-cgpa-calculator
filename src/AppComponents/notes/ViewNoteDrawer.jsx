import React, { useState, useEffect } from "react";

const ViewNoteDrawer = ({ isOpen, onClose, title, body, createdAt, archived }) => {

  return (
    <>
    <div className={`history-drawer ${isOpen ? "opened" : ""}`}>
      <div className="drawer-header border-bottom mb-4 pb-2">
        <h4>Note Details</h4>
        <button onClick={onClose} className="close_drawer btn btn-sm text-white">
        <i className="bi bi-x"></i>
        </button>
      </div>
        <h4 className="text-left mb-0">{title}</h4>
        <p className="mb-0 text-left text-muted"><small>{createdAt}</small></p>
        <pre className="w-100 text-left text-white my-4">{body}</pre>
      </div>
    </>
  );
}

export default ViewNoteDrawer;
