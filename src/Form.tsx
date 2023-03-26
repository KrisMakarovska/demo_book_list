import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const FormControl = () => {
  // const classes = useStyles();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');

  return (
    <>
    <div>
      <ArrowBackIosNewIcon />
    </div>

      <form  hidden>
        <div className='textfield'>
          <TextField
            label="Name"
            variant="outlined"
            inputProps={{ maxLength: 70 }}
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='textfield'>
          <TextField
            label="Author"
            variant="outlined"
            inputProps={{ maxLength: 120 }}
            type="text"
            required
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className='textfield'>
          <TextField
            label="Published Year"
            variant="outlined"
            required
            fullWidth
            type="number"
            // inputProps={{ min: 0, max: 10 }}
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          // className={classes.button}
          type="submit"
        >
          Save
        </Button>
      </form>
    </>

  );
}