import React, { useState, useEffect } from "react";
import { copyToClipboard } from "../../utils/index";

const ViewNoteDrawer = ({
  isOpen,
  onClose,
  title,
  body,
  createdAt,
  image,
  archived,
}) => {
  return (
    <>
      <div className={`history-drawer ${isOpen ? "opened" : ""}`}>
        <div
          className="drawer-header border-bottom mb-4 pb-2 position-sticky"
          style={{ top: "0", background: "#1a1a1a" }}
        >
          <h4>Note Details</h4>

          <div className="d-flex align-items-center">
            <div
              className="copy_icon mb-0 mr-3"
              onClick={() => copyToClipboard(`${title} \n\n${body}`)}
            >
              <i className="bi bi-copy text-white"></i>
            </div>
            <button
              onClick={onClose}
              className="close_drawer btn btn-sm text-white"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
        {image && (
          <img src={image} className="w-100 img-responsive img-fluid" alt="" />
        )}
        <h4 className={`${image ? "mt-4" : ""} text-left mb-0`}>
          {title}{" "}
          {archived && (
            <small className="archived_badge">
            Archived
            </small>
          )}
        </h4>
        <p className="mb-0 text-left text-muted">
          <small>{createdAt}</small>
        </p>
        <pre
          className="w-100 text-left text-white my-4"
          style={{
            textWrap: "wrap",
            lineHeight: "2",
          }}
        >
          {body}
        </pre>
      </div>
    </>
  );
};

export default ViewNoteDrawer;
