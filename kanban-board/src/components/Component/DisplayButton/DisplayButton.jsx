import React from "react";
import { BiSlider } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import './DisplayButton.css';

export default function DisplayButton({ onClick }) {
  return (
    <button className="display-button-wrapper" onClick={onClick}>
      <BiSlider />
      <h1 className="display-button-text">Display</h1>
      <MdKeyboardArrowDown />
    </button>
  );
}
