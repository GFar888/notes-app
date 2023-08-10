import React from "react";
import styles from "./spinner.module.scss";

export default function Spinner({ styleProps }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner} style={styleProps}></div>
    </div>
  );
}
