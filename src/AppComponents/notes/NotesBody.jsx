import React, { useState, useEffect } from "react";

import NotesList from "./NotesList";

export default function NotesBody({
  activeNotes,
  archivedNotes,
  formatDate,
  handleDeleteNote,
  handleArchiveNote,
  searchTerm,
  setSearchTerm,
  handleEditNote,
}) {
  let activeNoteList = (
    <NotesList
      data={activeNotes}
      formatDate={formatDate}
      handleDeleteNote={handleDeleteNote}
      handleArchiveNote={handleArchiveNote}
      handleEditNote={handleEditNote}
    />
  );
  if (activeNotes.length === 0) {
    activeNoteList =
      archivedNotes.length && !activeNotes.length && searchTerm.length >= 0 ? (
        <h6 className="red">No note available</h6>
      ) : (
        <h6
          className="red d-flex justify-content-center align-items-center"
          style={{ minHeight: "55vh" }}
        >
          No note available
        </h6>
      );
  }

  let archiveNoteList = (
    <NotesList
      data={archivedNotes}
      formatDate={formatDate}
      handleDeleteNote={handleDeleteNote}
      handleArchiveNote={handleArchiveNote}
      handleEditNote={handleEditNote}
    />
  );
  if (archivedNotes.length === 0) {
    archiveNoteList = <h6 className="red">No note available</h6>;
  }

  useEffect(() => {}, [activeNotes, archivedNotes]);

  return (
    <div className="note-app__body mt-0 px-0">
      {/* {(searchTerm.length > 0 && activeNotes.length >= 0) || (searchTerm.length > 0 && activeNotes.length >= 0) && ( */}
      <>
        <div className="note-search">
          <input
            type="text"
            placeholder="Search Notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="my-0 w-100 form-control"
            disabled={activeNotes.length === 0 && !searchTerm.length}
          />
        </div>
        <h4 className="text-left my-4">Active Notes</h4>
      </>
      {/* )} */}
      {activeNoteList}
      {archivedNotes.length > 0 ? (
        <>
          <h4 className="border-top text-left my-4 mt-5 pt-3">
            Archived Notes
          </h4>
          {archiveNoteList}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
