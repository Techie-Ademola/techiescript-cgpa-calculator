import React, { useState, useEffect } from "react";
import NotesHeader from "./NotesHeader";
import NotesBody from "./NotesBody";
import { getInitialData, showFormattedDate } from "../../utils/index";
import $ from "jquery";
import bus from "../../utils/bus";
import { toast } from "sonner";
import swal from "sweetalert";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    // Retrieve notes from local storage when the app initializes
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    bus.on("create_active", (val) => {
      if (val && val === true) {
        setEditingNote(null);
      }
    });
  }, []);

  const onAddNotes = (newNote) => {
    const noteObject = {
      id: Date.now(), // Unique ID
      title: newNote.title,
      body: newNote.body,
      createdAt: new Date().toISOString(), // Current date in ISO format
      archived: false, // Default value for archived
    };

    const updatedNotes = [...notes, noteObject];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save updated notes to local storage
    toast.success("Note created!");
  };

  const handleEditNote = (id) => {
    $("#exampleModal").modal("show");

    const noteToEdit = notes.find((note) => note.id === id);
    // console.log('edit called:', noteToEdit);
    setEditingNote(noteToEdit);
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEditingNote(null);
    toast.success("Note updated!");
  };

  const handleDeleteNote = (id) => {
    const noteTobeDeleted = notes.filter((note) => note.id === id);

    swal({
      title: `Confirm you want to delete ${noteTobeDeleted[0].title} note`,
      // title: `Confirm you want to delete ${noteTobeDeleted[0].title} note permanently`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Update local storage
        toast.success("Note deleted!");
      }
    });
  };

  const handleArchiveNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        toast.success(
          !note.archived ? `Archived ${note.title}` : `Unarchived ${note.title}`
        );
        return { ...note, archived: !note.archived }; // Toggle archived status
      }
      return note;
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Update local storage
  };

  const filteredData = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeNotes = filteredData.filter((note) => !note.archived);
  const archivedNotes = filteredData.filter((note) => note.archived);

  return (
    <>
      <div className="w-100 notes_wrap px-2">
        <NotesHeader
          onAddNotes={onAddNotes}
          editingNote={editingNote}
          handleUpdateNote={handleUpdateNote}
        />
        <NotesBody
          activeNotes={activeNotes}
          archivedNotes={archivedNotes}
          formatDate={showFormattedDate}
          handleDeleteNote={handleDeleteNote}
          handleArchiveNote={handleArchiveNote}
          handleEditNote={handleEditNote}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </>
  );
}
