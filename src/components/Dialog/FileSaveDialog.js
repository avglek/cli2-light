import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {toExcel} from '../../utils/docExport';


export default function FileSaveDialog({open, handleClose,data}) {

  const [fileName, setFileName] = useState('')

  const handleChange = (event) => {
    setFileName(event.target.value)
  }


  const handleClickOk = async() => {
    await toExcel(data,fileName)
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            onChange={handleChange}
            value={fileName}
            autoFocus
            margin="dense"
            id="name"
            label="Введите имя файла"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            ОТМЕНА
          </Button>
            <Button onClick={handleClickOk} color="primary">
              ОК
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
