import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { DialogTitle, Typography } from '@material-ui/core';

export default function DialogCloseTab({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{'Данные не сохранены'}</DialogTitle>
        <DialogContent>
          <Typography variant={'body1'}>
            Сохранить сделаные изменения?
          </Typography>
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
