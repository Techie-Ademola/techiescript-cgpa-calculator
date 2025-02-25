import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get the current path
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
  sortOrder,
  handleSortChange,
}) {
  const location = useLocation(); // Get the current location

  const [activeLink, setActiveLink] = useState(location.pathname); // Set initial active link based on current path

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update active link on click
  };

  const currentRoute = window.location.pathname;

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
        <h6 
          className="red d-flex justify-content-center align-items-center"
          style={{ minHeight: "55vh" }}>No note available</h6>
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
  if (archivedNotes.length === 0 && currentRoute.includes("/archived")) {
    archiveNoteList = <h6
          className="red d-flex justify-content-center align-items-center"
          style={{ minHeight: "55vh" }}>No note available</h6>;
  }

  useEffect(() => {
    // console.log("sortOrder: ", sortOrder);
  }, [activeNotes, archivedNotes, sortOrder]);

  return (
    <div className="note-app__body mt-0 px-0">
      {/* {(searchTerm.length > 0 && activeNotes.length >= 0) || (searchTerm.length > 0 && activeNotes.length >= 0) && ( */}
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
      <div className="d-flex justify-content-between align-items-center mb-">
        <div className="d-flex align-items-center">
        {currentRoute.includes("/archived") && 
          <Link to="/notes" className="copy_icon mb-0 mr-1">
            <i
              className="bi bi-arrow-left text-white"
              style={{
                fontSize: "20px",
              }}
            ></i>
          </Link>
        }

          <h4 className="text-left my-4 d-none d-sm-block">
            {currentRoute.includes("/archived")
              ? "Archived Notes"
              : "Active Notes"}
          </h4>
          <h5 className="text-left my-4 d-block d-sm-none">
            {currentRoute.includes("/archived")
              ? "Archived Notes"
              : "Active Notes"}
          </h5>
        </div>
        <div className="mydict">
          <div>
            <label>
              <input
                type="radio"
                name="radio"
                value={"desc"}
                onChange={(e) => handleSortChange(e.target.value)}
                checked={sortOrder === "desc"}
              />
              {/* <span>Newest</span> */}
              <i className="text-white bi bi-sort-up"></i>
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value={"asc"}
                onChange={(e) => handleSortChange(e.target.value)}
                checked={sortOrder === "asc"}
              />
              {/* <span>Oldest</span> */}
              <i className="text-white bi bi-sort-down"></i>
            </label>
          </div>
        </div>
        {/* <!-- From Uiverse.io by mahiatlinux -->  */}

        {/* <select value={sortOrder} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select> */}
      </div>

      {currentRoute.includes("/archived") && (
        <>
          {/* {archivedNotes.length > 0 && (
          )} */}
            <>
              {/* <h4 className="border-top text-left my-4 mt-5 pt-3">
                
              </h4> */}
              {archiveNoteList}
            </>
        </>
      )}
      {currentRoute.includes("/notes") && <>{activeNoteList}</>}
    </div>
  );
}
