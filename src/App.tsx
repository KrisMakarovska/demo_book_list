/* eslint-disable no-var */
import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./index.scss";

import { getBooks } from "./api/requests";
import { Book } from "./types/Book";
import { convertToFormattedTime } from "./utils/convertToFormattedTime";

import { AddForm } from "./components/AddForm/AddForm";
import { EditForm } from "./components/EditForm/EditForm";
import { Home } from "./components/HomeComponent/Home";
import { FilteredBy } from "./types/Filters";

export const App = () => {
  const [booksFromServer, setBooksFromServer] = useState<Book[]>([]);
  //context
  const [filter, setFilter] = useState("");
  const [popupAction, setPopupAction] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getBooks()
      .then((data) => {
        const formattedBooks = data.map((book: Book) => {
          return {
            ...book,
            createdAt: convertToFormattedTime(book.createdAt),
            modifiedAt:
              book.modifiedAt === "--"
                ? "--"
                : convertToFormattedTime(book.modifiedAt),
          };
        });
        setBooksFromServer(formattedBooks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const booksFiltered: Book[] = useMemo(() => {
    return booksFromServer.filter((book) => {
      switch (filter) {
        case FilteredBy.ALL:
          return true;

        case FilteredBy.ACTIVE:
          return !book.deactivated;

        case FilteredBy.DEACTIVATED:
          return book.deactivated;

        default:
          return !book.deactivated;
      }
    });
  }, [booksFromServer, filter]);

  const actionBooks = (action: string, book: Book) => {
    switch (action) {
      case "add":
        setBooksFromServer([...booksFromServer, book]);
        break;
      case "edit":
        setBooksFromServer(
          booksFromServer.map((b: Book) => {
            if (b.id === book.id) {
              return { ...b, ...book };
            } else {
              return b;
            }
          })
        );
        break;
      case "delete":
        setBooksFromServer(
          booksFromServer.filter((b: Book) => b.id !== book.id)
        );
        break;
      default:
        return book;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/books" />} />
      <Route path="/books">
        <Route
          index
          element={
            <Home
              booksFiltered={booksFiltered}
              booksFromServer={booksFromServer}
              actionBooks={actionBooks}
              setFilter={setFilter}
              filter={filter}
              setPopupAction={setPopupAction}
              popupAction={popupAction}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          }
        />
        <Route
          path="add"
          element={
            <AddForm
              actionBooks={actionBooks}
              setPopupAction={setPopupAction}
              setShowPopup={setShowPopup}
            />
          }
        />

        <Route
          path=":id/edit"
          element={
            <EditForm
              actionBooks={actionBooks}
              setShowPopup={setShowPopup}
              setPopupAction={setPopupAction}
            />
          }
        />
      </Route>
    </Routes>
  );
};
