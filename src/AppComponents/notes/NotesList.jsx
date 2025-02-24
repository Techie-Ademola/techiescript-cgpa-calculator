import React from "react";
import NotesItem from "./NotesItem";

export default function NotesList({
  data,
  formatDate,
  handleDeleteNote,
  handleArchiveNote,
  handleEditNote,
}) {
  return (
    <div className="notes-list">
      {data.map((dataItem) => (
        <NotesItem
          key={dataItem.id}
          {...dataItem}
          formatDate={formatDate}
          handleDeleteNote={handleDeleteNote}
          handleArchiveNote={handleArchiveNote}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  );
}
