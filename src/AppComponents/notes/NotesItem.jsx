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
  image,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  const getAbbreviation = (name) => {
    if (name) {
      let passedName = name.replace(/"/g, '').trim();

      const words = passedName.split(' ');
      if (words.length >= 2) {
        return words[0][0]?.toUpperCase() + words[1][0]?.toUpperCase();
      } else if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase();
      }
      return '';
    }
    return '';
  };


  return (
    <>
      <div className="note-item">
        <div className="note-item__content d-flex align-items-center w-100" onClick={() => setIsDrawerOpen(true)}>
          {image ? <div className="note_image">
            <img src={image} alt="Note" style={{ width: '100px', height: '100px' }} />
          </div> : (
            <div className="note_image">
              { getAbbreviation(title) }
            </div>
          )}
          <div className="w-100 overflow-hidden ml-3">
          <h6 className="note-item__title mb-2 text-left">{title}</h6>
          <pre className="note-item__body text-white text-left mb-0">{body}</pre>
          <p className="note-item__date text-left mb-0">{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className="note-item__action mt-0 w-75">
          <button
            className="note-item__view-button text-white"
            onClick={() => setIsDrawerOpen(true)}
          >
            <i className="bi bi-view-list"></i>
            {/* View */}
          </button>
          {!archived &&
          <button
            className="note-item__edit-button text-white"
            onClick={() => handleEditNote(id)}
          >
            <i className="bi bi-pencil-square"></i>
            {/* Edit */}
          </button>
          }
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
        image={image}
      />
    </>
  );
}
