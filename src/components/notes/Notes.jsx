import React, { useContext, useState } from "react";
import { AppContext } from "../../pages/home/Home";
import styles from "./deleteEditIcon.module.scss";
import EditNotePopup from "../../components/newNote/EditNotePopup";
import Skeleton from "./Skeleton";
import currentDate from "../../modules/currentDate";
import { db } from "../../config/firebase-config";
import { addDoc, deleteDoc, doc, getDoc, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const Notes = ({ isLoading }) => {
  const { notes, currentUser } = useContext(AppContext);
  const [showEditNotePopup, setShowEditNotePopup] = useState(false);
  const [editNoteData, setEditNoteData] = useState({});

  const deleteNote = async (id) => {
    try {
      const docRef = doc(
        collection(db, "allNotes", currentUser.uid, "userNotes"),
        id
      );
      await deleteDoc(docRef);
      toast.success("Successfully deleted!");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const editNote = async (note) => {
    try {
      setEditNoteData(note);
      setShowEditNotePopup(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="all-notes">
      {isLoading
        ? [...new Array(7)].map((_, i) => <Skeleton key={i} />)
        : notes.map((note) => {
            return (
              <div className="note" key={note.id}>
                <div className="wrapper">
                  <div className="note-header">
                    <div
                      className="note-tag"
                      style={{ backgroundColor: note.tag.color }}
                    ></div>
                    <h2 className="note-title">{note.title}</h2>
                  </div>
                  <p className="note-body">{note.body}</p>
                </div>

                <p className="create-date">{currentDate(note.createDate)}</p>

                <svg
                  onClick={() => deleteNote(note.id)}
                  className={styles.delete}
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 12V17"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 12V17"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7H20"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                    stroke="#444444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  onClick={() => editNote(note)}
                  className={styles.edit}
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />

                  <path
                    d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                    fill="none"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />

                  <polygon
                    fill="none"
                    points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            );
          })}
      {showEditNotePopup && (
        <EditNotePopup
          editNoteData={editNoteData}
          showState={setShowEditNotePopup}
        />
      )}
    </div>
  );
};

export default Notes;
