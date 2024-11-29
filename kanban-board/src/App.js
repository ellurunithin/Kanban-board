import { useCallback, useContext, useMemo } from "react";
import { AppContext } from "./state/context";
import DisplayButton from "./components/Component/DisplayButton/DisplayButton";
import DisplayCard from "./components/Component/DisplayCard/DisplayCard";
import { useEffect, useRef, useState } from "react";
import { ColumnHeader } from "./components/Layout/Layout";
import Card from "./components/Component/Card/Card";
import Column from "./components/Layout/Column";

function App() {
  const { dataToRender } = useContext(AppContext);

  // Checks for opening and closing based on mouse clicks
  const [isOpen, setIsOpen] = useState(false);
  const displayCardRef = useRef(null);
  const handleClickOutside = (e) => {
    if (
      displayCardRef.current &&
      !displayCardRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };
  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderedData = useMemo(() => {
    return dataToRender?.map((category) => (
      <Column key={category.name}>
        <>
          <ColumnHeader
            icon={category.icon}
            name={category.name}
            count={category.tickets.length}
            available={category.available}
          />
          <div className="column-cards">
            {category.tickets.map((ticket) => (
              <Card data={ticket} key={ticket.id} />
            ))}
          </div>
        </>
      </Column>
    ));
  }, [dataToRender]);

  return (
    <>
      <div className="top-bar">
        <div className="displayButtonWrapper" ref={displayCardRef}>
          <DisplayButton onClick={toggleOpen} />
          {isOpen && <DisplayCard />}
        </div>
      </div>
      <div className="main">{renderedData}</div>
    </>
  );
}

export default App;
