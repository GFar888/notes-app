import React, { useState, useContext, useEffect } from "react";
import styles from "./profile.module.scss";
import AvatarEditor from "react-avatar-editor";
import { storage } from "../../config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AppContext } from "../../pages/home/Home";
import Spinner from "../spinner/Spinner";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "./Skeleton";

const Profile = () => {
  const { currentUser, setShowProfile } = useContext(AppContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [image, setImage] = useState(currentUser.photoURL);
  const [showChangeBtn, setShowChangeBtn] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const changeAvatar = async () => {
    const storageRef = ref(storage, `avatars/${currentUser.uid}.jpg`);
    if (!image) {
      toast.error("Please select an image!");

      return;
    }
    setShowSpinner(true);

    await uploadBytes(storageRef, image);

    const url = await getDownloadURL(storageRef);
    await updateProfile(currentUser, { photoURL: url });
    setShowSpinner(false);
    setShowProfile(false);

    toast.success("Avatar changed!");
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const getImage = (event) => {
    setImage(event);
    localStorage.setItem("user", currentUser.photoURL);
    setShowChangeBtn(true);
  };
  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <svg
          className={styles.closeIcon}
          onClick={closeProfile}
          fill="#000000"
          width="800px"
          height="800px"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
        </svg>
        {!imgLoaded && <Skeleton />}
        <img
          style={imgLoaded ? {} : { display: `none` }}
          onLoad={() => setImgLoaded(true)}
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          className={styles.imagePreview}
        />
        <label htmlFor="file-upload" className="custom-file-upload">
          <div className={styles.chooseFile}>Choose File</div>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(event) => getImage(event.target.files[0])}
        />
        <input type="file" />
        {showChangeBtn && (
          <button onClick={changeAvatar} className={styles.changeButton}>
            Change
            {showSpinner ? (
              <Spinner styleProps={{ width: "0.7rem", height: "0.7rem" }} />
            ) : (
              ""
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
