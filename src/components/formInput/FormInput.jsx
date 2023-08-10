import React from "react";

const FormInput = (props) => {
  return (
    <div className="formInput">
      <input
        className="log-sign-input"
        required
        placeholder={props.placeholder}
        onChange={(e) => props.setData(e.target.value)}
        type={props.type}
      />
    </div>
  );
};

export default FormInput;
