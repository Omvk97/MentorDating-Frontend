import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function FormDialog({
  open,
  handleClose,
  onConfirm,
  dialogText,
  dialogTitle,
  confirmButtonText,
  inputLabel
}) {
  const [formInput, setFormInput] = useState("");
  function onConfirmInput() {
    onConfirm(formInput);
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogText}</DialogContentText>
        <TextField
          autoComplete="email"
          autoFocus
          margin="dense"
          id="name"
          label={inputLabel}
          type="email"
          fullWidth
          onChange={event => setFormInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuller
        </Button>
        <Button onClick={onConfirmInput} color="primary">
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
