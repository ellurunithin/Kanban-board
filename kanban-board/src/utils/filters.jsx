import { LuCircleDashed } from "react-icons/lu";
import { PiCircleHalfFill } from "react-icons/pi";
import { MdCheckCircle } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { BsFillXCircleFill, BsThreeDots, BsExclamationSquareFill } from "react-icons/bs";
import SignalHigh from "../assets/icons/SignalHigh.svg";
import SignalMedium from "../assets/icons/SignalMedium.svg";
import SignalLow from "../assets/icons/SignalLow.svg";

// Function to return the appropriate icon based on ticket status
export function getStatusIcon(status, color) {
  switch (status) {
    case "Backlog":
      return <LuCircleDashed color={color || "gray"} />;
    case "Todo":
      return <FaRegCircle color={color || "gray"} />;
    case "In progress":
      return <PiCircleHalfFill color={color || "#F1CA49"} />;
    case "Done":
      return <MdCheckCircle color={color || "#5E6AD2"} />;
    case "Canceled":
      return <BsFillXCircleFill color={color || "gray"} />;
    default:
      return <LuCircleDashed color={color || "gray"} />;
  }
}

// Function to return the appropriate priority icon
export function getPriorityIcon(index, color) {
  switch (index) {
    case 1:
      return <img src={SignalLow} width={16} height={16} />;
    case 2:
      return <img src={SignalMedium} width={16} height={16} />;
    case 3:
      return <img src={SignalHigh} width={16} height={16} />;
    case 4:
      return <BsExclamationSquareFill color={color || "#FC7840"} />;
    default:
      return <BsThreeDots color={color || "#697077"} />;
  }
}

// Function to filter the tickets based on the display state
export default function filter(data, displayState) {
  // Grouping by status
  if (displayState.grouping === "status") {
    const statuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
    // Ordering by priority
    if (displayState.ordering === "priority") {
      return statuses.map((status) => {
        return {
          name: status,
          icon: getStatusIcon(status),
          tickets: data.tickets
            .filter((ticket) => ticket.status === status)
            .sort((a, b) => a.priority - b.priority),
        };
      });
    } 
    // Ordering by title
    else {
      return statuses.map((status) => {
        return {
          name: status,
          icon: getStatusIcon(status),
          tickets: data.tickets
            .filter((ticket) => ticket.status === status)
            .sort((a, b) => a.title.localeCompare(b.title)),
        };
      });
    }
  }
  // Grouping by user
  else if (displayState.grouping === "user") {
    // Ordering by priority
    if (displayState.ordering === "priority") {
      return data.users.map((user) => {
        return {
          name: user.name,
          available: user.available,
          icon: (
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              style={{ borderRadius: "50%" }}
            />
          ),
          tickets: data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.priority - b.priority),
        };
      });
    } 
    // Ordering by title
    else {
      return data.users.map((user) => {
        return {
          name: user.name,
          available: user.available,
          icon: (
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              style={{ borderRadius: "50%" }}
            />
          ),
          tickets: data.tickets
            .filter((ticket) => ticket.userId === user.id)
            .sort((a, b) => a.title.localeCompare(b.title)),
        };
      });
    }
  }
  // Grouping by priority
  else {
    const priorityNames = ["No priority", "Low", "Medium", "High", "Urgent"];
    const priorityArrays = [[], [], [], [], []];
    data.tickets.forEach((ticket) => {
      priorityArrays[ticket.priority].push(ticket);
    });
    priorityArrays.forEach((array) => {
      array.sort((a, b) => a.title.localeCompare(b.title));
    });
    return priorityArrays.map((tickets, index) => {
      return {
        name: priorityNames[index],
        icon: getPriorityIcon(index),
        tickets: tickets,
      };
    });
  }
}
