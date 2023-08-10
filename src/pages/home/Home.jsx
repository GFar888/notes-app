import { React, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import "../../scss/app.scss";
import Header from "../../components/header/Header";
import Tags from "../../components/tags/Tags";
import Notes from "../../components/notes/Notes";
import NewNote from "../../components/newNote/NewNote";
import Profile from "../../components/profile/Profile";
import toast, { Toaster } from "react-hot-toast";

import { collections, db } from "../../config/firebase-config";
import {
  onSnapshot,
  getDocs,
  doc,
  addDoc,
  setDoc,
  collection,
} from "firebase/firestore";

export const AppContext = createContext();

function Home() {
  const [data, setData] = useState([]);
  const [newNotePopup, setNewNotePopup] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [tags, setTags] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrenUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrenUser(user);

        const unsubscribe = onSnapshot(
          collection(db, "allNotes", user.uid, "userNotes"),
          (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            const sortedData = newData.sort(
              (x, y) => y.createDate - x.createDate
            );
            setData(sortedData);
            setTags(sortedData.map((el) => el.tag));
            setIsLoading(false);
          }
        );
        return unsubscribe;
      }
    });
  }, []);

  const notes =
    !selectedFilter || selectedFilter === "All"
      ? data.filter((note) => note.title.toLowerCase().includes(filterData))
      : data.filter((note) => note.tag.name === selectedFilter);

  return (
    <div className="app">
      <AppContext.Provider
        value={{
          newNotePopup,
          setNewNotePopup,
          tags,
          selectedFilter,
          setSelectedFilter,
          notes,
          tags,
          currentUser,
          setShowProfile,
        }}
      >
        {showProfile && <Profile />}

        <Header setData={setFilterData} />
        <Tags isLoading={isLoading} />
        <Notes isLoading={isLoading} />
        {newNotePopup && <NewNote />}
      </AppContext.Provider>
    </div>
  );
}

export default Home;
