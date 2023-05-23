import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Book } from "../../types/Book";
import { AddButton } from "./AddButton/addButton";
import { Table } from "./Table/Table";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FilteredBy } from "../../types/Filters";

type Props = {
  actionBooks: (a: string, b: Book) => void;
  booksFromServer: Book[];
  booksFiltered: Book[];
  setFilter: (s: string) => void;
  filter: string;
  setPopupAction: (s: string) => void;
  popupAction: string;
  showPopup: boolean;
  setShowPopup: (s: boolean) => void;
};

export const Home = ({
  actionBooks,
  booksFiltered,
  booksFromServer,
  setFilter,
  filter,
  setPopupAction,
  popupAction,
  showPopup,
  setShowPopup,
}: Props) => {
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

  const numberOfBooks = `${booksFiltered.length} of ${booksFromServer.length} books`;

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
        <div className="filter">
          <select
            className="filter__selector"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
              event.target.blur();
            }}
          >
            <option value={FilteredBy.ACTIVE}>Show active</option>
            <option value={FilteredBy.ALL}>Show all</option>
            <option value={FilteredBy.DEACTIVATED}>Show deactivated</option>
          </select>
          <div className="filter__quantity">{numberOfBooks}</div>
        </div>

        <div ref={nextSectionRef}>
          <Table
            booksFiltered={booksFiltered}
            actionBooks={actionBooks}
            setPopupAction={setPopupAction}
            popupAction={popupAction}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
          />
        </div>
      </div>
      <div className="footer">
        <a
          href="https://github.com/KrisMakarovska"
          className="footer__title"
          rel="noreferrer"
          target={"_blank"}
        >
          GitHub Account
        </a>
      </div>
    </>
  );
};
