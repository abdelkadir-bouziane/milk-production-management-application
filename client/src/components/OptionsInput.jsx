import { useState } from "react";
import { MdOutlineKeyboardArrowDown as ArrowIcon } from "react-icons/md";
import OutsideAlerter from "./OutsideAlerter";

function OptionsInput({ options, optionValue, setOptionValue }) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSelectOption = (e) => {
    const content =
      e.target.textContent === "لا شيء" ? "" : e.target.textContent;
    setOptionValue(content);
    setOptionsVisible(false);
  };

  return (
    <div className="options-input">
      <OutsideAlerter hideListOption={() => setOptionsVisible(false)}>
        <div
          className="input-box"
          onClick={() => {
            setOptionsVisible(!optionsVisible);
          }}
        >
          <input
            type="text"
            placeholder="لا شيء"
            value={optionValue}
            disabled
          />
          <ArrowIcon
            className="arrow-icon"
            style={
              optionsVisible && {
                transform: "rotate(180deg)",
              }
            }
          />
        </div>
        {optionsVisible && (
          <ul className="list-options">
            <li onClick={(e) => handleSelectOption(e)}>لا شيء</li>
            {options.map((option, index) => (
              <li key={index} onClick={(e) => handleSelectOption(e)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </OutsideAlerter>
    </div>
  );
}

export default OptionsInput;
