import React, { useContext } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AppContext } from "../../../state/context";
import './DisplayCard.css';

export default function DisplayCard() {
  // State from global context
  const { displayState, setDisplayState } = useContext(AppContext);

  // Data for select menu dropdowns
  const DisplayObj = {
    grouping: ["status", "user", "priority"],
    ordering: ["priority", "title"],
  };

  // onChangeHandler for the dropdowns
  const onChangeHandler = (e) => {
    const modifiedDisplayState = { ...displayState };
    if (e.target.id === "grouping") {
      modifiedDisplayState.grouping = e.target.value;
    } else if (e.target.id === "ordering") {
      modifiedDisplayState.ordering = e.target.value;
    }
    setDisplayState(modifiedDisplayState);
  };

  return (
    <div className="display-card-wrapper">
      <div className="setting-wrapper">
        <h1 className="label">Grouping</h1>
        <div className="select-wrapper">
          <select
            id="grouping"
            name="grouping"
            onChange={onChangeHandler}
            value={displayState.grouping}
          >
            {DisplayObj.grouping.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
          <div className="arrow-down">
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
      <div className="setting-wrapper">
        <h1 className="label">Ordering</h1>
        <div className="select-wrapper">
          <select
            id="ordering"
            name="ordering"
            onChange={onChangeHandler}
            value={displayState.ordering}
          >
            {DisplayObj.ordering.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
          <div className="arrow-down">
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
}
