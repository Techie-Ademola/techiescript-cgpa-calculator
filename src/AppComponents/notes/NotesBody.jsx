import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation to get the current path
import NotesList from "./NotesList";
import NotesInput from "./NotesInput";
import $ from "jquery";
import bus from "../../utils/bus";
import { AdSenseAd, BuyMeCoffee } from '../../components/Monetization/AdComponents';

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
  onAddNotes,
  editingNote,
  handleUpdateNote,
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

  const closeModal = () => {
    $("#exampleModal").modal("hide");
  };

  const handleSetModal = () => {
    bus.emit("create_active", true);
  };

  useEffect(() => {
    // console.log('editingNote in NotesInput: ', editingNote);
  }, [editingNote]);

  return (
    <>
{/* <div className="note-app__header d-flex justify-content-between align-items-center px-0 pb-2">
      <h3 className="mb-0">Notes</h3>

      
    </div> */}
    <div className="note-app__body mt-5 px-0">
      {/* {(searchTerm.length > 0 && activeNotes.length >= 0) || (searchTerm.length > 0 && activeNotes.length >= 0) && ( */}
      <div className="note-search d-flex">
        <input
          type="text"
          placeholder="Search Notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-0 w-100 form-control"
          disabled={activeNotes.length === 0 && !searchTerm.length}
        />
        <button
        type="button"
        className="btn d-flex justify-content-center align-items-center ml-3"
        style={{ background: "#343a40", color: "white" }}
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={handleSetModal}
      >
        <i className="bi-plus"></i>{" "}
        <span className="text-white">Create</span>
      </button>
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


      {activeNotes.length > 0 && currentRoute.includes("/notes") ? (
        <>
        {/* Support button */}
        <div className="support-container py-4 pb-5">
          <BuyMeCoffee />
          <a href="https://www.buymeacoffee.com/adeoyesodev" target='_blank' className='d-block '><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=adeoyesodev&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
        </div>
        </>
      ) : archivedNotes.length > 0 && currentRoute.includes("/archived") ? (
        <>
        {/* Support button */}
        <div className="support-container py-4 pb-5">
          <BuyMeCoffee />
          <a href="https://www.buymeacoffee.com/adeoyesodev" target='_blank' className='d-block '><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=adeoyesodev&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
        </div>
        </>
      ) : <></> }
    </div>


      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ background: "#202222" }}>
            <div className="modal-header border-0">
              <h5 className="modal-title" id="exampleModalLabel">
                {editingNote ? "Edit Note" : "Create New Note"}
              </h5>
              <button
                type="button"
                className="close text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              >
                <span aria-hidden="true" className="text-white">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <div className="note-input mb-0">
                <NotesInput
                  onAddNotes={(note) => {
                    if (editingNote) {
                      handleUpdateNote({ ...editingNote, ...note }); // Update existing note
                    } else {
                      onAddNotes(note); // Create new note
                    }
                    closeModal(); // Close the modal after adding or updating the note
                  }}
                  initialTitle={editingNote ? editingNote.title : ""} // Populate title if editing
                  initialBody={editingNote ? editingNote.body : ""} // Populate body if editing
                  initialImage={editingNote ? editingNote.image : null} // Populate image if editing
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
