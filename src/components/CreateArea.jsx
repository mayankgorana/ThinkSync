import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

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

  function expand(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (<input
          onChange={handleChange}
          name="title"
          value={note.title}
          placeholder="Title"
        />
        )}
        {errors.title && (
          <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>{errors.title}</p>
        )}

        <textarea
          onClick={expand}
          onChange={handleChange}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        {errors.content && (
          <p style={{ color: "red", fontSize: "12px", marginLeft: "5px" }}>{errors.content}</p>
        )}

        <Zoom in={isExpanded}>
          <Fab onClick={submitBtn}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
