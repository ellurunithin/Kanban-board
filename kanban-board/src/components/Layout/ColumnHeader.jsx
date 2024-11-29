import React from "react";
import { BsThreeDots, BsCircleFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

export default function ColumnHeader({ icon, name, count = 0, available }) {
  return (
    <div className="column-header-wrapper">
      <div className="left">
        <div className="icon">
          {icon}
          {available !== undefined && (
            <div className="available-icon">
              <BsCircleFill color={available ? "#FFB302" : "gray"} />
            </div>
          )}
        </div>
        <h1 className="title">{name}</h1>
        <h1 className="count">{count}</h1>
      </div>
      <div className="right">
        <BiPlus color="#697077" size={18} />
        <BsThreeDots color="#697077" size={18} />
      </div>
    </div>
  );
}
