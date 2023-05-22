import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Paper } from "@mui/material";
import { BackArrow } from "../BackArrow/BackArrow";
import { ValidationModal } from "../ValidationModal/ValidationModal";

import { addBook } from "../../api/requests";
import { Book } from "../../types/Book";
import { formatBookTimeData } from "../../utils/convertToFormattedTime";

type Props = {
  actionBooks: (a: string, b: Book) => void;
  setPopupAction: (a: string) => void;
  setShowPopup: (s: boolean) => void;
};

// interface FormData {
//   id: number;
//   name: string;
//   author: string;
//   category: string;
//   isbn: string;
// }

export const AddForm = ({
  actionBooks,
  setPopupAction,
  setShowPopup,
}: Props) => {
  const randomNumber = Math.floor(Math.random() * 500) + 1;

  const [formData, setFormData] = useState({
    id: randomNumber,
    name: "",
    author: "",
    category: "",
    isbn: "",
  });
  const [validationModal, setValidationModal] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name.trim() !== "" && 
      formData.author.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.isbn.trim() !== ""
    ) {
      const currentDate = new Date();
      const utcDateTime = currentDate.toISOString();

      const newBook = {
        id: randomNumber,
        name: formData.name,
        author: formData.author,
        category: formData.category,
        isbn: formData.isbn,
        createdAt: `${utcDateTime}`,
        modifiedAt: "--",
        deactivated: false,
      };

      addBook(newBook).then((data) => {
        setPopupAction("added");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
        const formatedBookTime = formatBookTimeData(data);
        actionBooks("add", formatedBookTime);
      });

      setFormData({
        id: 0,
        name: "",
        author: "",
        category: "",
        isbn: "",
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
            <Link to={"/books#bottom"} className="form__arrow">
              <BackArrow />
            </Link>

            <h2 className="form__title">Please add a new book:</h2>

            <form onSubmit={handleOnSubmit}>
              <input
                className="form__field"
                name="name"
                placeholder="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                className="form__field"
                type="text"
                name="author"
                placeholder="author"
                value={formData.author}
                onChange={handleInputChange}
              />
              <select
                className="form__field"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Choose category
                </option>
                <option value="fiction">Fiction</option>
                <option value="comedy">Comedy</option>
                <option value="novel">Novel</option>
              </select>

              <input
                className="form__field"
                type="number"
                name="isbn"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleInputChange}
              />
              <button className="form__button" type="submit">
                Save
              </button>
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
