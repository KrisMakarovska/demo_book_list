import { Navigate, Route, Routes } from "react-router-dom";
import './index.scss';

import booksFromServer from "./api/booksFromServer.json";
import { Book } from "./types/Book";

import { AddForm } from "./components/AddForm/AddForm";
import { EditForm } from "./components/EditForm/EditForm";
import { BookView } from "./components/BookView/BookView";
import { Home } from "./components/HomeComponent/Home";
import { useLocalStorage } from "./api/localStorage";

export const App = () => {
  const [booksToShow, setBooksToShow] = useLocalStorage('book', booksFromServer);

  const actionBooks = (action: string, book: Book) => {
    switch (action) {
      case "add":
        setBooksToShow([...booksToShow, book]);
        break;
      case "edit":
        setBooksToShow(
          booksToShow.map((b: Book) => {
            if (b.id === book.id) {
              return { ...b, ...book };
            } else {
              return b;
            }
          })
        );
        break;
      case "delete":
        setBooksToShow(booksToShow.filter((b: Book) => b.id !== book.id));
        break;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books">
        <Route
          index
          element={<Home booksToShow={booksToShow} actionBooks={actionBooks} />}
        />
        <Route path="add" element={<AddForm actionBooks={actionBooks} />} />

        <Route
          path=":id/edit"
          element={<EditForm actionBooks={actionBooks} />}
        />
        <Route path=":id" element={<BookView />} />
      </Route>
    </Routes>
  );
};
