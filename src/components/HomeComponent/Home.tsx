import { Table } from "./Table/Table";
import { Book } from "../../types/Book";
import { AddButton } from "./AddButton/addButton";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  actionBooks: (a: string, b: Book) => void;
  booksToShow: Book[];
};

export const Home = ({ actionBooks, booksToShow }: Props) => {
  const myRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  console.log(location)

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
        <h1 className="header__title">WELCOME TO THE ONLINE LIBRARY</h1>
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
        <div ref={nextSectionRef}>
          <Table booksToShow={booksToShow} actionBooks={actionBooks} />
        </div>
      </div>
      <div className="footer">
        <h1 className="footer__title">ENJOY READING!</h1>
      </div>
    </>
  );
};
