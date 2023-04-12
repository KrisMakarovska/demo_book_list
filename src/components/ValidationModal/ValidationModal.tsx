import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type Props = {
  setValidationModal: (t: boolean) => void;
};

export const ValidationModal = ({ setValidationModal }: Props) => {
  const handleConfirm = () => {
    setValidationModal(false);
  };

  return (
    <Dialog onClose={handleConfirm} open={true}>
      <DialogContent>
        <DialogContentText>
          <p> Published year needs to be between 1900-2023.</p>
          Name and author can`t be empty.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className="validation-button" type="submit" onClick={handleConfirm}>
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
};
