import React, { useContext } from "react";
import { BsCircleFill } from "react-icons/bs";
import { AppContext } from "../../../state/context";
import { getPriorityIcon, getStatusIcon } from "../../../utils/filters";
import "./Card.css"; // Import the CSS file

export default function Card({ data }) {
  const { displayState, data: appData } = useContext(AppContext);
  const grouping = displayState.grouping;

  const findUserById = (userId) => {
    return appData?.users.find((user) => user.id === userId);
  };

  const statusIcon = getStatusIcon(data.status);
  const priorityIcon = getPriorityIcon(data.priority, "#697077");

  return (
    <div className="card-wrapper">
      <div className="id-line">
        <h1 className="id-text">{data.id}</h1>
        {grouping.toString() !== "user" && (
          <div className="usr-img-wrapper">
            
            <img
              className="usr-img"
              src={`https://i.pravatar.cc/150?u=${data.userId}`}
              alt="User Avatar"
            />
            <BsCircleFill
              color={findUserById(data.userId)?.available ? "#FFB302" : "gray"}
            />
          </div>
        )}
      </div>
      <div className="title-line">
        {grouping.toString() !== "status" && (
          <div className="status-icon">{statusIcon}</div>
        )}
        <h1 className="title">{data.title}</h1>
      </div>
      <div className="bottom-line">
        {grouping.toString() !== "priority" && (
          <div className="priority-img-wrapper">{priorityIcon}</div>
        )}
        {data.tag && (
          <div className="tags">
            {data.tag.map((tag) => (
              <div className="tag" key={tag}>
                <BsCircleFill color="#a8a8a8" size={12} />
                <h1>{tag}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
