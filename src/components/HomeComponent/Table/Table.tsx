import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from 'classnames';
import { editBook } from '../../../api/requests';
// import { insertPopUpMessege } from '../../../utils/popupMessenge';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Book } from "../../../types/Book";
import { deleteBook } from '../../../api/requests';
import { formatBookTimeData } from "../../../utils/convertToFormattedTime";
import { PopupMessege } from "../../PopupMessege/PopupMessege";

type Props = {
  booksFiltered: Book[];
  actionBooks: (a: string, b: Book) => void,
  setPopupAction: (a: string) => void,
  popupAction: string,
  showPopup: boolean,
  setShowPopup: (s: boolean) => void,
};

export const Table = ({ booksFiltered, actionBooks, setPopupAction, popupAction, showPopup, setShowPopup }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const navigate = useNavigate();

  const handleDeleteClick = (book: Book) => {
    if (book.deactivated) {
      setBookToDelete(book);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmModal = () => {
    if (bookToDelete !== null) {
      deleteBook(bookToDelete.id)
        .then(() => {
            setBookToDelete(null);
            setPopupAction('deleted');
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false)
            }, 2000);
            actionBooks("delete", bookToDelete);

        })
      setOpenModal(false);
    }
  };

  const handleEditBook = (book: Book) => {
    navigate(`/books/${book.id}/edit`, { state: { book } });
  };

  const handleStatusBook = (book: Book) => {
    const updatedStatus = { deactivated: !book.deactivated };

    editBook(book.id, updatedStatus)
      .then((data: any) => {
        const formatedBookTime = formatBookTimeData(data);
        actionBooks('edit', formatedBookTime);
      })
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
            <button
              className="table__modal table__modal--cancel"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="table__modal table__modal--confirm"
              onClick={handleConfirmModal}
            >
              Confirm
            </button>
          </DialogActions>
        </Dialog>
      )}

      {showPopup && (
        <PopupMessege popupAction={popupAction}/>
      )}

      <thead className="table__header">
        <tr>
          <th className="table__column table__column--name">Book Title</th>
          <th className="table__column table__column--author">Author Name</th>
          <th className="table__column table__column--category">Category</th>
          <th className="table__column table__column--isbn">ISBN</th>
          <th className="table__column table__column--createdAt">Created</th>
          <th className="table__column table__column--modifiedAt">Modified</th>
          <th className="table__column table__column--actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        {booksFiltered.map((book: Book) => (
          <tr key={book.id} className="table__rows">
            <td
            className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--name")}
              data-label="Book Title"
            >
              {book.name}
            </td>

            <td
              className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--author")}
              data-label="Author Name"
            >
              {book.author}
            </td>

            <td
              className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--category")}
              data-label="Category"
            >
              {book.category}
            </td>

            <td
              className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--isbn")}
              data-label="ISBN"
            >
              {book.isbn}
            </td>

            <td
              className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--createdAt")}
              data-label="Created"
            >
              {book.createdAt}
            </td>

            <td
              className={classnames({"table__rows--deactivated": book.deactivated}, "table__row--modifiedAt")}
              data-label="Modified"
            >
              {book.modifiedAt}
            </td>
            <td className="table__row--actions">
                <button
                  className="table__row--editButton"
                  onClick={() => handleEditBook(book)}>edit
                </button>

                <button
                className={classnames(
                  { "table__row--actButtonDeact": !book.deactivated },
                  "table__row--actButton"
                )}
                  onClick={() => handleStatusBook(book)}>
                    {book.deactivated ? 're-activate' : 'deactivate'}
                </button>

                <button
                  className={classnames(
                    { "table__row--delButtonDeact": !book.deactivated },
                    "table__row--delButton"
                  )}
                  onClick={() => handleDeleteClick(book)}>delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

