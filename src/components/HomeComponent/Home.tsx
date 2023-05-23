import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Book } from "../../types/Book";
import { AddButton } from "./AddButton/addButton";
import { Table } from "./Table/Table";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatusFilter } from "../Filter/Filter";
import { Footer } from "./Footer/Footer";

type Props = {
  actionBooks: (a: string, b: Book) => void;
};

export const Home = ({ actionBooks }: Props) => {
  const myRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#bottom" && myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const nextSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollClick = () => {
    if (myRef.current !== null) {
      nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="header">
        <h1 className="header__title">DEMO BOOK LIST</h1>
        <a onClick={handleScrollClick}>
          <FontAwesomeIcon
            className="scroll-icon"
            icon={faChevronDown}
            size="3x"
          />
        </a>
      </div>

      <div className="home" ref={myRef} id="bottom">
        <Link to={"/books/add"} className="home__addbutton">
          <AddButton />
        </Link>

        <StatusFilter />

        <div ref={nextSectionRef}>
          <Table actionBooks={actionBooks} />
        </div>
      </div>

      <Footer />
    </>
  );
};
