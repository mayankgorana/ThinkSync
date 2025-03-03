import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function submitBtn(event) {
    event.preventDefault();

    let newErrors = {};
    if (!note.title.trim()) newErrors.title = "Title cannot be empty";
    if (!note.content.trim()) newErrors.content = "Content cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"
        />
        {errors.title && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.title}</p>
        )}

        <textarea
          onChange={handleChange}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        {errors.content && (
          <p style={{ color: "red", fontSize: "12px" }}>{errors.content}</p>
        )}

        <button onClick={submitBtn}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
