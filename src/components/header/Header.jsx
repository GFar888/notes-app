import React, { useState, useContext } from "react";
import defaultAvatar from "../../assets/img/avatar-batman-comics-svgrepo-com.svg";

import { AppContext } from "../../pages/home/Home";

import Quit_Avatar_Popup from "../quit_avatar_popup/Quit_Avatar_Popup";

const Header = ({ setData }) => {
  const [inputValue, setInputValue] = useState("");
  const { currentUser } = useContext(AppContext);

  const handleSearch = (value) => {
    setInputValue(value);
    setData(value.toLowerCase());
  };

  const onClear = () => {
    setInputValue("");
    setData("");
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <h1>Note</h1>
        <h1>App</h1>
      </div>
      <div className="input-user-wrapper">
        <div className="input-wrapper">
          <input
            value={inputValue}
            className="search-input"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
          />
          <svg
            className="clearIcon"
            onClick={onClear}
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" />
          </svg>
        </div>
        <div className="user">
          <Quit_Avatar_Popup />
          <h3 className="user-name">{currentUser.displayName}</h3>

          <img className="user-img" src={currentUser.photoURL} />
        </div>
      </div>
    </div>
  );
};

export default Header;
