import CopyrightIcon from '@material-ui/icons/Copyright';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '28px',
    background: '#fafafa',
    borderTop: '1px solid #bdbdbd',
    color: '#a0a0a0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flexGrow: '9',

    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flexGrow: '3',
    height: '100%',

    display: 'flex',
  },
  call: {
    flexGrow: '5',
    borderLeft: '1px solid #bdbdbd',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    flexGrow: '5',
    borderLeft: '1px solid #bdbdbd',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const FooterBar = () => {
  const classes = useStyles();

  const { items, pointer } = useSelector((state) => state.tabs);

  const item = items[pointer];
  const procedureCall = item?.call;

  let countDoc = 0;
  let countDetail = 0;

  if (item) {
    const dataTable = item.data?.outdata?.filter(
      (i) => i.datatype === 'CURSOR'
    );

    if (dataTable) {
      if (dataTable[0]) {
        countDoc = dataTable[0].value?.filterRows?.length;
      }
      if (dataTable[1]) {
        countDetail = dataTable[1].value?.filterRows?.length;
      }
    }
  }

  return (
    <footer className={classes.root}>
      <div className={classes.logo}>
        <CopyrightIcon fontSize="small" />
        Copyright ООО "ИЦС-УК"
      </div>
      <div className={classes.status}>
        <div className={classes.count}>
          {countDoc
            ? `Кол - во строк: ${
                countDetail ? countDoc + '/' + countDetail : countDoc
              }`
            : ''}
        </div>
        <div className={classes.call}>
          {procedureCall ? `Процедура: ${procedureCall}` : ''}
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
