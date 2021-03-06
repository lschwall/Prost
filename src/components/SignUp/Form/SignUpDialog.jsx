import React, { useEffect, useState } from 'react';
import {
  Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

const SignUpDialog = ({ setViewValue, setCounter }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteLocal = () => {
    delete localStorage.token;
    setViewValue('Landing');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Disclaimer</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          THIS WILL SHOW WHY WE COLLECT THE INFORMATION
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            deleteLocal();
            handleClose;
          }}
          color="primary"
        >
          Disagree
        </Button>
        <Button
          onClick={() => {
            handleClose;
            setCounter(1);
          }}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpDialog;
