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
          Published year needs to be between 1900-2023
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleConfirm} variant="contained" color="primary">
          OK
        </Button> */}
        <button className="validation-button" type="submit" onClick={handleConfirm}>
          OK
        </button>
      </DialogActions>
    </Dialog>
  );
};
