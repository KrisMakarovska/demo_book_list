import { Button, Paper } from "@mui/material";
import { BackArrow } from "../BackArrow/BackArrow";
import bookview from '../../images/bookview.jpg';

import { NavLink, useLocation, useNavigate } from "react-router-dom";

export const BookView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;

  const handleFormSubmit = () => {
    navigate(`/books/${book.id}/edit`, { state: { book } });
  };

  return (
    <div className="container">
      <div className="form">
        <Paper className="form-viewbook">
          <NavLink to={"/books#bottom"} className="form__arrow">
            <BackArrow />
          </NavLink>

          <form className="form__inputs" onSubmit={handleFormSubmit}>
            <input
              className="form__field"
              name="name"
              disabled
              value={book.name}
            />

            <input
              className="form__field"
              type="text"
              name="author"
              disabled
              value={book.author}
            />

            <input
              className="form__field"
              type="number"
              name="published"
              disabled
              value={book.published}
            />

            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
          </form>
          <img
            src={bookview}
            alt={book.name}
            className="form-viewbook__image"
          />
        </Paper>
      </div>
    </div>
  );
};
