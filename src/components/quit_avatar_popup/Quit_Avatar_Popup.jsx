import React, { useContext } from "react";
import styles from "./quit.module.scss";
import { collections, db } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { AppContext } from "../../pages/home/Home";

import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

const Quit_Avatar_Popup = () => {
  const { setShowProfile } = useContext(AppContext);
  const navigate = useNavigate();

  function changeProfile() {
    setShowProfile(true);
  }

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <span className={styles.actionPopup}>
        <h5 onClick={changeProfile}>Change Avatar</h5>
        <h5 onClick={logOut}>Log Out</h5>
      </span>
    </>
  );
};

export default Quit_Avatar_Popup;
