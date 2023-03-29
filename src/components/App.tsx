import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import '../index.scss';

import booksFromServer from "../api/booksFromServer.json";
import { Book } from "../types/Book";

import { AddForm } from "./AddForm/AddForm";
import { EditForm } from "./EditForm/EditForm";
import { BookView } from "./BookView/BookView";
import { Home } from "./HomeComponent/Home";

export const App = () => {
  const [booksToShow, setBooksToShow] = useState<Book[]>(booksFromServer);

  const actionBooks = (action: string, book: Book) => {
    switch (action) {
      case "add":
        setBooksToShow([...booksToShow, book]);
        break;
      case "edit":
        setBooksToShow(
          booksToShow.map((b) => {
            if (b.id === book.id) {
              return { ...b, ...book };
            } else {
              return b;
            }
          })
        );
        break;
      case "delete":
        setBooksToShow(booksToShow.filter((b) => b.id !== book.id));
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
