import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Book } from "../../../types/Book";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

type Props = {
  booksToShow: Book[];
  actionBooks: (a: string, b: Book) => void;
};

export const Table = ({ booksToShow, actionBooks }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<Book | null>(null);

  const navigate = useNavigate();

  const handleDeleteClick = (book: Book) => {
    setItemIdToDelete(book);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmModal = () => {
    if (itemIdToDelete !== null) {
      actionBooks("delete", itemIdToDelete);
      setOpenModal(false);
    }
  };

  const handleEditBook = (book: Book) => {
    navigate(`/books/${book.id}/edit`, { state: { book } });
  };

  const handleViewBook = (book: Book) => {
    navigate(`/books/${book.id}`, { state: { book } });
  };

  return (
    <table className="table">
      {openModal && (
        <Dialog open={openModal}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this book?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              onClick={handleConfirmModal}
              variant="contained"
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <thead className="table__header">
        <tr>
          <th className="table__column table__column--name">Name</th>
          <th className="table__column table__column--author">Author</th>
          <th className="table__column table__column--published">Published</th>
          <th className="table__column table__column--edit">Edit</th>
          <th className="table__column table__column--delete">Delete</th>
          <th className="table__column table__column--view">View Book</th>
        </tr>
      </thead>
      <tbody>
        {booksToShow.map((book: Book) => (
          <tr key={book.id} className="table__rows">
            <td className="table__row table__row--name" data-label="Name">
              <input
                className="text-field"
                type="text"
                defaultValue={book.name}
                disabled
              />
            </td>
            <td className="table__row table__row--author" data-label="Author">
              <input
                className="text-field"
                type="text"
                value={book.author}
                disabled
              />
            </td>
            <td
              className="table__row table__row--published"
              data-label="Published"
            >
              <input
                className="text-field"
                type="text"
                value={book.published}
                disabled
              />
            </td>
            <td className="table__row table__row--edit">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleEditBook(book)}
              />
            </td>
            <td className="table__row table__row--delete">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeleteClick(book)}
              />
            </td>

            <td className="table__row table__row--eye">
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => handleViewBook(book)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
