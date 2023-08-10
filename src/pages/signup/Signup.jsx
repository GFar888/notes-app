import React, { useState } from "react";
import "./signup.scss";
import FormInput from "../../components/formInput/FormInput";
import { NavLink, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/img/avatar-batman-comics-svgrepo-com.svg";
import validateEmail from "../../modules/emailValidator";
import Spinner from "../../components/spinner/Spinner";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db } from "../../config/firebase-config";
import {
  onSnapshot,
  getDocs,
  addDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore";
import { auth } from "../../config/firebase-config";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill everything!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter proper email!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 chars!");
      return;
    }
    setShowSpinner(true);

    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    onAuthStateChanged(auth, () => {
      if (user) {
        updateProfile(user, {
          displayName: username,
          photoURL: defaultAvatar,
        });
      }
    });

    const docRef = doc(db, "users", user.uid);

    const docData = {
      uid: user.uid,
      name: username,
      email,
    };
    await setDoc(docRef, docData);

    const userIdRef = doc(db, "allNotes", user.uid);
    const colRef = collection(userIdRef, "userNotes");

    addDoc(colRef, {
      title: `${username}'s first note`,
      body: 'Click on "Add a new Note" or edit this note.',
      tag: { name: "Your tag", color: "#49C8EB" },
      createDate: new Date().getTime(),
    })
      .then(() => {
        toast.success("User created!");
      })
      .catch((err) => {
        toast.error("Error creating document", err);
      });
    setShowSpinner(true);
    navigate("/");
  };

  return (
    <div className="background">
      <button className="btn-returnToLogin" onClick={() => navigate("/")}>
        Login
      </button>

      <form className="form">
        <div className="logo-wrapper">
          {showSpinner ? (
            <Spinner
              styleProps={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ) : (
            ""
          )}
          <div className="logo-login-signup">
            <h1>Note</h1>
            <h1>App</h1>
          </div>
          <h1 className="signup-text">SignUp</h1>
        </div>

        <FormInput setData={setUsername} type="text" placeholder="User Name" />

        <FormInput
          setData={setEmail}
          type="email"
          placeholder="Email"
          name="email"
        />
        <FormInput
          setData={setPassword}
          type="password"
          placeholder="Password"
        />

        <div className="btns-wrapper">
          <button className="btn-signup btn" onClick={(e) => handleSignUp(e)}>
            Signup
          </button>
        </div>

        <div className="wave1-signup"></div>
        <div className="wave2-signup"></div>
      </form>
    </div>
  );
};

export default Signup;
