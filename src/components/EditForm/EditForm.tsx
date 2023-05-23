import Paper from "@mui/material/Paper";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BackArrow } from "../BackArrow/BackArrow";

import { editBook } from "../../api/requests";
import { Book, PatchBook } from "../../types/Book";
import { formatBookTimeData } from "../../utils/convertToFormattedTime";
import { SharedDataContext } from "../../utils/context";

type Props = {
  actionBooks: (a: string, b: Book) => void;
};

export const EditForm = ({ actionBooks }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [editedBook, setEditedBook] = useState<Book>(location.state?.book);
  const [disabledButton, setDisabledButton] = useState(false);

  const { setPopupAction, setShowPopup } = useContext(SharedDataContext);
  const { id, name, author, category, isbn } = editedBook;

  useEffect(() => {
    setEditedBook(location.state?.book);
  }, [location]);

  useEffect(() => {
    if (name.trim() !== "" && author.trim() !== "" && isbn.trim() !== "") {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [editedBook]);

  const handleInputChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (editedBook !== null) {
      const { name, value } = event.target;
      setEditedBook((prevBookData) => ({ ...prevBookData, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (author.trim() !== "" && name.trim() !== "") {
      const currentDate = new Date();
      const utcDateTime = currentDate.toISOString();

      const editData: PatchBook = {
        name,
        author,
        category,
        isbn,
        modifiedAt: `${utcDateTime}`,
      };

      editBook(id, editData).then((data: any) => {
        setPopupAction("edited");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
        const formatedBookTime = formatBookTimeData(data);
        actionBooks("edit", formatedBookTime);
      });
    }

    navigate("/books/#bottom");
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <Paper className="form__cover">
            <NavLink to={"/books#bottom"} className="form__arrow">
              <BackArrow />
            </NavLink>

            <h2 className="form__title">Please edit book</h2>

            <form onSubmit={handleSubmit}>
              <input
                className="form__field"
                name="name"
                placeholder="Name"
                required
                value={name}
                onChange={handleInputChanges}
              />

              <input
                className="form__field"
                type="text"
                name="author"
                placeholder="Author"
                required
                value={author}
                onChange={handleInputChanges}
              />

              <select
                className="form__field"
                required
                name="category"
                value={category}
                onChange={handleInputChanges}
              >
                <option value="" disabled>
                  Choose category
                </option>
                <option value="fiction">fiction</option>
                <option value="comedy">comedy</option>
                <option value="novel">novel</option>
              </select>

              <input
                className="form__field"
                type="number"
                name="isbn"
                placeholder="ISNB"
                required
                value={isbn}
                onChange={handleInputChanges}
              />

              <button
                className="edit-button"
                type="submit"
                disabled={disabledButton}
              >
                Save
              </button>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};
