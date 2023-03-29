import { Table } from "./Table/Table";
import { Book } from "../../types/Book";
import { AddButton } from "./AddButton/addButton";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";


type Props = {
  actionBooks: (a: string, b: Book) => void;
  booksToShow: Book[];
};

export const Home = ({ actionBooks, booksToShow }: Props) => {
  const myRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#bottom" && myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <div className="header">
        <h1 className="header__title">WELCOME TO THE ONLINE LIBRARY</h1>
      </div>
      <div className="home" ref={myRef} id="bottom">
        <NavLink to={"/books/add"} className="home__addbutton">
          <AddButton />
        </NavLink>
        <div>
          <Table booksToShow={booksToShow} actionBooks={actionBooks} />
        </div>
      </div>
      <div className="footer">
        <h1 className="footer__title">ENJOY READING!</h1>
      </div>
    </>
  );
};
