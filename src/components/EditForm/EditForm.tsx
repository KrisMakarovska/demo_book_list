import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { BackArrow } from "../BackArrow/BackArrow";

import { Book } from "../../types/Book";
import { useEffect, useState } from "react";
import { ValidationModal } from "../ValidationModal/ValidationModal";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

type Props = {
  actionBooks: (a: string, B: Book) => void;
};

export const EditForm = ({ actionBooks }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [editedBook, setEditedBook] = useState<Book>(location.state?.book);
  const [validationModal, setValidationModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    setEditedBook(location.state?.book);
  }, [location]);

  const { name, author, published } = editedBook;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedBook !== null) {
      setEditedBook({ ...editedBook, name: event.target.value });
    }
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedBook !== null) {
      setEditedBook({ ...editedBook, author: event.target.value });
    }
  };

  const handleAPublishedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (editedBook !== null) {
      setEditedBook({ ...editedBook, published: event.target.value });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    actionBooks("edit", editedBook);
    navigate("/books/#bottom");
  };

  useEffect(() => {
    if (
      name.length <= 70 &&
      author.length <= 120 &&
      +published >= 1900 &&
      +published <= 2023
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [editedBook]);

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
                maxLength={70}
                value={name}
                onChange={handleNameChange}
              />

              <input
                className="form__field"
                type="text"
                name="author"
                placeholder="Author"
                required
                maxLength={120}
                value={author}
                onChange={handleAuthorChange}
              />

              <input
                className="form__field"
                type="number"
                name="published"
                placeholder="Published year"
                required
                value={published}
                onChange={handleAPublishedChange}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={disabledButton}
              >
                Save
              </Button>
            </form>
          </Paper>
        </div>
      </div>

      {validationModal && (
        <ValidationModal setValidationModal={setValidationModal} />
      )}
    </>
  );
};
