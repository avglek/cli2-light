import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { Typography } from '@material-ui/core';

export default function DialogRemoveRows({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <Typography variant={'body1'}>Удалить выбранные строки ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="secondary">
            ОТМЕНА
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
