import React, { useState, useEffect } from "react";

export default function NotesInput({ onAddNotes, initialTitle, initialBody }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  let maxCharTitle = 50;
  const [limitChar, setLimitChar] = useState(maxCharTitle);

  function handleSubmit(e) {
    e.preventDefault();
    onAddNotes({ title, body });
    setTitle("");
    setBody("");
    setLimitChar(maxCharTitle);
  }

  function handleChange(e) {
    const newTitle = e.target.value;
    if (newTitle.length <= maxCharTitle) {
      setTitle(newTitle);
      setLimitChar(maxCharTitle - newTitle.length);
    }
  }

  useEffect(() => {
    setTitle(initialTitle ? initialTitle : "");
    setBody(initialBody ? initialBody : "");
  }, [initialTitle, initialBody]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p className="note-input__title__char-limit">
          Remaining Characters: {limitChar}
        </p>
        <input
          type="text"
          className="note-input__title"
          placeholder="Title..."
          required
          onChange={handleChange}
          value={title}
        />
        <textarea
          className="note-input__body"
          rows={4}
          placeholder="Write your note here ..."
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">{initialTitle ? "Update" : "Create"}</button>
      </form>
    </>
  );
}
