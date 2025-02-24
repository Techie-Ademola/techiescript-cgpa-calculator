import React, { useState, useEffect } from "react";
import ViewNoteDrawer from "./ViewNoteDrawer.jsx";

export default function NotesItem({
  id,
  title,
  body,
  createdAt,
  formatDate,
  archived,
  handleDeleteNote,
  handleArchiveNote,
  handleEditNote,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="note-item">
        <div className="note-item__content">
          <h4 className="note-item__title">{title}</h4>
          <p className="note-item__date">{formatDate(createdAt)}</p>
          <pre className="note-item__body text-white mt-4">{body}</pre>
        </div>
        <div className="note-item__action">
          <button
            className="note-item__view-button text-white"
            onClick={() => setIsDrawerOpen(true)}
          >
            <i className="bi bi-view-list"></i>
            {/* View */}
          </button>
          <button
            className="note-item__edit-button text-white"
            onClick={() => handleEditNote(id)}
          >
            <i className="bi bi-pencil-square"></i>
            {/* Edit */}
          </button>
          <button
            className="note-item__delete-button"
            onClick={() => handleDeleteNote(id)}
          >
            <i className="bi bi-trash3"></i>
            {/* Delete */}
          </button>
          {!archived ? (
            <button
              className="note-item__archive-button"
              onClick={() => handleArchiveNote(id)}
            >
              <i className="bi bi-archive"></i>
              {/* Archive */}
            </button>
          ) : (
            <button
              className="note-item__archive-button"
              onClick={() => handleArchiveNote(id)}
            >
              <i className="bi bi-folder-minus"></i>
              {/* Unarchive */}
            </button>
          )}
        </div>
      </div>

      <ViewNoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={title}
        body={body}
        createdAt={formatDate(createdAt)}
        archived={archived}
      />
    </>
  );
}
