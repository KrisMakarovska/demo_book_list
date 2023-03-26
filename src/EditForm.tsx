import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Book } from './types/Book';

type Props = {
    selectedRow: Book | null,
    setSelectedRow: (row: Book) => void,
}

export const EditForm = ({
    selectedRow,
    setSelectedRow,
}: Props) => {
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedRow !== null) {
          setSelectedRow({ ...selectedRow, name: event.target.value });
        }
      };
    
      const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedRow !== null) {
          setSelectedRow({ ...selectedRow, author: event.target.value });
        }
      };
    
      const handleAPublishedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedRow !== null) {
          setSelectedRow({ ...selectedRow, published: +event.target.value });
        }
      };

      const name = selectedRow?.name || '';
      const author = selectedRow?.author || '';
      const published = selectedRow?.published || null;

  return (
    <Paper style={{ margin: "10px", padding: "10px" }}>
      <Typography variant="h4" gutterBottom>
        Please enter your changes:
      </Typography>
      <div>
        <TextField
          name="name"
          value={name}
          onChange={handleNameChange}
          style={{ marginBottom: "10px" }}
          inputProps={{ maxLength: 70 }}
          fullWidth
        />
      </div>

      <div>
        <TextField
          name="author"
          value={author}
          onChange={handleAuthorChange}
          style={{ marginBottom: "10px" }}
          inputProps={{ maxLength: 120 }}
          fullWidth
        />
      </div>

      <div>
        <TextField
          name="published"
          type="number"
          value={published}
          onChange={handleAPublishedChange}
          style={{ marginBottom: "10px" }}
          inputProps={{ maxLength: 70 }}
          fullWidth
        />
      </div>
    </Paper>
  );
};
