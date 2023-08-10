import { React, useRef, useEffect, useContext, useState } from "react";
import { AppContext } from "../../pages/home/Home";

import SelectTags from "./SelectTags";

import { collections, db } from "../../config/firebase-config";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const NewNote = () => {
  const popupRef = useRef();
  const { newNotePopup, setNewNotePopup, currentUser } = useContext(AppContext);

  const [showTagSelection, setShowTagSelection] = useState(false);
  const [validateInput, setValidateInput] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
    createDate: new Date().getTime(),
    tag: { name: "", color: "" },
  });

  const addNote = async (e) => {
    if (!newNote.title || !newNote.body || !newNote.tag.name) {
      setValidateInput(true);
    } else {
      e.preventDefault();
      setNewNotePopup(false);

      try {
        // const docRef = await addDoc(collections, newNote);
        const userIdRef = doc(db, "allNotes", currentUser.uid);
        const colRef = collection(userIdRef, "userNotes");
        await addDoc(colRef, newNote);
        toast.success("Successfully added!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="backdrop">
      <div className="newNote" ref={popupRef}>
        <input
          type="text"
          className="newNote-title"
          placeholder="Note title"
          onChange={(e) => (
            setNewNote({ ...newNote, title: e.target.value }),
            setValidateInput(false)
          )}
        />
        <textarea
          onChange={(e) => (
            setNewNote({ ...newNote, body: e.target.value }),
            setValidateInput(false)
          )}
          type="text"
          className="newNote-text"
          placeholder="Write a note..."
        />
        {validateInput && (
          <p className="empty-title-body-error">Cannot be empty...</p>
        )}
        <div className="newNote-footer">
          {showTagSelection && (
            <SelectTags
              setEmptyError={setValidateInput}
              getTag={{ newNote, setNewNote }}
              state={setShowTagSelection}
            />
          )}
          <div className="delete-tag-wrapper">
            <svg
              className="tag-icon"
              onClick={() => setShowTagSelection((prev) => !prev)}
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.858 20H10.221C6.3456 20 4.40789 20 3.20394 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.20394 5.17157C4.40789 4 6.34561 4 10.221 4H12.858C15.0854 4 16.1992 4 17.1289 4.50143C18.0586 5.00286 18.6488 5.92191 19.8294 7.76001L20.5102 8.82001C21.5034 10.3664 22 11.1396 22 12C22 12.8604 21.5034 13.6336 20.5102 15.18L19.8294 16.24C18.6488 18.0781 18.0586 18.9971 17.1289 19.4986C16.1992 20 15.0854 20 12.858 20ZM7 7.05423C7.41421 7.05423 7.75 7.37026 7.75 7.76011V16.2353C7.75 16.6251 7.41421 16.9412 7 16.9412C6.58579 16.9412 6.25 16.6251 6.25 16.2353V7.76011C6.25 7.37026 6.58579 7.05423 7 7.05423Z"
                fill="#444444"
              />
            </svg>
            <div
              style={{
                marginLeft: "1rem",
                backgroundColor: newNote.tag.color,
                borderRadius: "0.3rem",
                padding: "0.2rem  0.5rem",
                maxWidth: "7rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {newNote.tag.name}
            </div>
          </div>
          <div>
            <h2 className="cancel-btn" onClick={() => setNewNotePopup(false)}>
              CANCEL
            </h2>

            <h2 className="save-btn" onClick={addNote}>
              SAVE
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
