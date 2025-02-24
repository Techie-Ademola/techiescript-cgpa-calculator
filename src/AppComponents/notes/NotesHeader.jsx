import NotesInput from "./NotesInput";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import bus from "../../utils/bus";

export default function NotesHeader({
  onAddNotes,
  editingNote,
  handleUpdateNote,
}) {
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
    <div className="note-app__header d-flex justify-content-between align-items-center px-0 pb-2">
      <h3 className="mb-0">Notes</h3>

      <button
        type="button"
        className="btn d-flex justify-content-center align-items-center"
        style={{ background: "#343a40", color: "white" }}
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={handleSetModal}
      >
        <i className="bi-plus"></i>{" "}
        <span className="text-white">Create Note</span>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ background: "#242424" }}>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
