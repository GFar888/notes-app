import React, { useState, useEffect } from "react";
import "./login.scss";
import FormInput from "../../components/formInput/FormInput";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import validateEmail from "../../modules/emailValidator";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/spinner/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill everything!");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter proper email!");
      return;
    }

    setShowSpinner(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setShowSpinner(false);
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.code.split("/")[1]);
        setShowSpinner(false);
      });
  };

  return (
    <div className="background">
      <form>
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
          <h1 className="login-text">Login</h1>
        </div>
        <FormInput setData={setEmail} type="email" placeholder="Email..." />
        <FormInput
          setData={setPassword}
          type="password"
          placeholder="Password..."
        />
        <div className="btns-wrapper">
          <button
            className="signup btn"
            onClick={() => navigate("/signup")}
            type="button"
          >
            Signup
          </button>
          <button
            className="login btn"
            onClick={(e) => handleLogin(e)}
            type="submit"
          >
            Login
          </button>
        </div>

        <div className="wave1"></div>
        <div className="wave2"></div>
      </form>
    </div>
  );
};

export default Login;
