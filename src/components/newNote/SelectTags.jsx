import { React, useState, useContext, useRef, useEffect } from "react";
import Select from "react-select";
import { GithubPicker } from "react-color";

import { AppContext } from "../../pages/home/Home";

const SelectTags = ({ state, getTag, setEmptyError }) => {
  const [selectedTag, setSelectedTag] = useState("");

  const [inputTag, setInputTag] = useState("");

  // { name: tag.name, color: tag.color }
  const [selectedColor, setSelectedColor] = useState({
    background: "#ffc400",
  });
  const [showGithubPicker, setShowGithubPicker] = useState(false);

  const [validateInput, setValidateInput] = useState(false);
  const { tags } = useContext(AppContext);
  const pickerRef = useRef();

  // handle click outside GithubPicker
  useEffect(() => {
    const outsideClick = (event) => {
      if (!event.composedPath().includes(pickerRef.current)) {
        setShowGithubPicker(false);
      }
    };
    document.body.addEventListener("click", outsideClick);
    return () => document.body.removeEventListener("click", outsideClick);
  }, []);

  // styles for dropdown selection
  const customStyles = {
    control: (base, state) => {
      return {
        ...base,
        border: "1px solid #ffc400",
        boxShadow: "none",
        "&:hover": {
          border: "1px solid #ffc400",
        },
      };
    },
  };

  const uniqueTags = tags.reduce(
    (acc, x) => acc.concat(acc.find((y) => y.name === x.name) ? [] : [x]),
    []
  );

  //values  for dropdown selection
  const options = uniqueTags.map((tag) => {
    return {
      value: { name: tag.name, color: tag.color },
      label: (
        <div
          style={{
            backgroundColor: tag.color,
            borderRadius: "0.3rem",
            paddingLeft: "0.2rem",
          }}
        >
          {tag.name}
        </div>
      ),
    };
  });

  const saveTag = () => {
    if (!selectedTag.name && !inputTag) {
      setValidateInput(true);
    } else {
      setEmptyError(false);
      const tag = {
        name: selectedTag.name ? selectedTag.name : inputTag,
        color: selectedTag.color ? selectedTag.color : selectedColor.background,
      };
      getTag.setNewNote({ ...getTag.newNote, tag: tag });
      state(false);
    }
  };

  // get color from GithubPicker
  const handleChangeComplete = (color, event) => {
    setSelectedColor({ background: color.hex });
    setShowGithubPicker(false);
  };

  return (
    <div className="select-tag-popUp">
      <Select
        isClearable={true}
        isDisabled={inputTag ? true : false}
        options={options}
        maxMenuHeight={110}
        onChange={(options) => (
          !options ? setSelectedTag("") : setSelectedTag(options.value),
          setValidateInput(false)
        )}
        styles={customStyles}
      />

      <div className="type-tag">
        <input
          disabled={selectedTag ? true : false}
          type="text"
          onChange={(e) => (
            setInputTag(e.target.value), setValidateInput(false)
          )}
          placeholder={selectedTag ? "Selected..." : "Tag name..."}
        />

        <div
          className="select-tag-color"
          style={{
            backgroundColor: selectedColor.background,
            pointerEvents: selectedTag ? "none" : "",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowGithubPicker(true);
          }}
        ></div>
      </div>

      {showGithubPicker && (
        <GithubPicker
          ref={pickerRef}
          className="git-picker"
          width={100}
          onChangeComplete={handleChangeComplete}
        />
      )}
      {validateInput && <p className="empty-error">Select or create new tag</p>}
      <div className="selectTag-btns-wrapper">
        <h2 className="selectTag-cancel-btn" onClick={() => state(false)}>
          CANCEL
        </h2>
        <h2 className="selectTag-ok-btn" onClick={saveTag}>
          OK
        </h2>
      </div>
    </div>
  );
};

export default SelectTags;
