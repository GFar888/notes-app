import React, { useContext, useState } from "react";
import { AppContext } from "../../pages/home/Home";
import Skeleton from "./Skeleton";

const Tags = ({ isLoading }) => {
  const { setNewNotePopup, selectedFilter, setSelectedFilter, tags } =
    useContext(AppContext);
  // const { tags } = useContext(AppContext);

  const uniqueTags = tags.reduce(
    (acc, x) => acc.concat(acc.find((y) => y.name === x.name) ? [] : [x]),
    []
  );

  return (
    <div className="tags-button-wrapper">
      <ul className="tags">
        <li
          onClick={() => setSelectedFilter("All")}
          className={selectedFilter !== "All" ? "tag " : "tag active"}
        >
          All
        </li>
        {isLoading
          ? [...new Array(3)].map((_, i) => <Skeleton key={i} />)
          : uniqueTags.map((tag) => (
              <li
                onClick={() => setSelectedFilter(tag.name)}
                className={selectedFilter === tag.name ? "tag active" : "tag"}
                key={tag.name}
              >
                {tag.name}
                <div
                  className="filterTag"
                  style={{ backgroundColor: tag.color }}
                ></div>
              </li>
            ))}
      </ul>

      <div
        className="add-note"
        onClick={(e) => {
          e.stopPropagation();

          setNewNotePopup(true);
        }}
      >
        + Add a new Note
      </div>
    </div>
  );
};

export default Tags;
