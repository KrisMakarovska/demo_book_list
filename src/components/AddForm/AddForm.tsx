import React, { useState } from "react";

import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { BackArrow } from "../BackArrow/BackArrow";

import { Book } from "../../types/Book";
import { useNavigate } from "react-router";
import { ValidationModal } from "../ValidationModal/ValidationModal";
import { NavLink } from "react-router-dom";

type Props = {
  actionBooks: (a: string, b: Book) => void;
};

export const AddForm = ({ actionBooks }: Props) => {
  const randomNumber = Math.floor(Math.random() * 500) + 1;

  const [formData, setFormData] = useState({
    id: randomNumber,
    name: "",
    author: "",
    published: "",
  });
  const [validationModal, setValidationModal] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (+formData.published >= 1900 && +formData.published <= 2023) {
      actionBooks("add", formData);
      setFormData({
        id: Math.random(),
        name: "",
        author: "",
        published: "",
      });
      navigate("/books#bottom");
    } else {
      setValidationModal(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <Paper className="form__cover">
            <NavLink to={"/books#bottom"} className="form__arrow">
              <BackArrow />
            </NavLink>

            <h2 className="form__title">Please add a new book:</h2>

            <form onSubmit={handleOnSubmit}>
              <input
                className="form__field"
                name="name"
                placeholder="Name"
                required
                maxLength={70}
                value={formData.name}
                onChange={handleInputChange}
              />

              <input
                className="form__field"
                type="text"
                name="author"
                placeholder="Author"
                required
                maxLength={120}
                value={formData.author}
                onChange={handleInputChange}
              />

              <input
                className="form__field"
                type="number"
                name="published"
                placeholder="Published year"
                required
                value={formData.published}
                onChange={handleInputChange}
              />

              <Button variant="contained" color="primary" type="submit">
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
