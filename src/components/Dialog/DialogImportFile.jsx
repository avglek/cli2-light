import React, { useCallback, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Radio, Space } from 'antd';
import { Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';
import { fromExcel } from '../../utils/docExport';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const StyledRadioGroup = styled(Radio.Group)`
  // margin-top: 20px;
`;

export default function DialogImportFile({ open, onClose, file }) {
  const { items, pointer } = useSelector((store) => store.tabs);
  const [over, setOver] = useState(false);
  const currentTabs = items[pointer];

  const processData = useCallback(
    (dataString) => {
      const dataStringLines = dataString.split(/\r\n|\n/);

      const list = [];
      for (let i = 0; i < dataStringLines.length; i++) {
        const row = dataStringLines[i]
          .trim()
          .split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        list.push(row);
      }
      const data = fromExcel(currentTabs.data.outdata[0].value.columns, list);

      currentTabs.onAddRow(data, over);
    },
    [currentTabs, over]
  );

  const fileUpload = useCallback(
    (file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
    },
    [processData]
  );

  const handleClickOk = useCallback(() => {
    fileUpload(file);
    onClose();
  }, [file, onClose, fileUpload]);

  const onChange = useCallback(
    (even) => {
      setOver(even.target.value === 'over');
    },
    [setOver]
  );

  useEffect(() => {
    if (open) {
      setOver(false);
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-import-title"
      >
        <DialogTitle id="dialog-import-title" color="red">
          {`Импорт данных из файла ${file?.name}`}
        </DialogTitle>
        <DialogContent>
          <StyledRadioGroup defaultValue={'add'} onChange={onChange}>
            <Space direction="vertical">
              <Radio key={'add'} value={'add'}>
                {'Добавить строки'}
              </Radio>
              <Radio key={'over'} value={'over'}>
                {'Заменить все строки'}
              </Radio>
            </Space>
          </StyledRadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
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
