import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import IconGridMenu from '../PopupMenus/IconGridMenu';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { updateTab } from '../../store/actions/tabAction';

import { GridToolTips } from './components/lib';

const useStyles = makeStyles((/*theme*/) => ({
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
}));

const staticCellStyle = { borderRight: '1px solid #aaa' };

const defaultColDef = {
  editable: false,
  resizable: true,
};

const AgGridData = ({ data }) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');
  const [colId, setColId] = useState('');
  const [subItems, setSubItems] = useState([]);
  const [columnDef, setColumnDef] = useState();

  const classes = useStyles();

  const handleClickCell = useCallback(
    (event) => {
      setAnchorEl(event.event.target);
      setValue(event.value);
      setColId(event.column.colId);

      const subData = data.data.subDocs.filter(
        (i) => i['FIELD_NAME'] === event.column.colId
      );
      setSubItems(subData);
    },
    [data.data.subDocs]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const gridOptions = useMemo(
    () => ({
      //onCellDoubleClicked: handleClickCell,
      onCellContextMenu: handleClickCell,
      suppressContextMenu: false,
      preventDefaultOnContextMenu: true,
    }),
    [handleClickCell]
  );

  const handleFilterOn = useCallback(() => {
    const rowsData = data.data.outdata[0].value.filterRows;

    const filtresData = rowsData.filter((item) => {
      return item[colId] === value;
    });

    data.data.outdata[0].value.filterRows = filtresData;
    dispatch(updateTab(data));

    handleClose();
  }, [colId, data, dispatch, handleClose, value]);

  const handleFilterOff = useCallback(() => {
    const rowsData = data.data.outdata[0].value.rows;
    data.data.outdata[0].value.filterRows = rowsData;
    dispatch(updateTab(data));
    handleClose();
  }, [data, dispatch, handleClose]);

  const onGridReady = useCallback((params) => {
    // const allColIds = params.columnApi
    //   .getAllColumns()
    //   .map((column) => column.colId);
    // console.log(allColIds);
    // params.columnApi.autoSizeColumns(allColIds);
  }, []);

  useEffect(() => {
    const colDef = [...data.data.outdata[0].value.columns].map((item) => {
      // switch (item.type) {
      //   // case 'string':
      //   //   return {
      //   //     headerName: item.name,
      //   //     width: `${item.size*5}px`,
      //   //     field: item.value,
      //   //     sortable: true,
      //   //     cellStyle: staticCellStyle,
      //   //   };
      //   default:
      return {
        headerName: item.name,
        field: item.value,
        width: item.size * 10 + 20,
        sortable: true,
        cellStyle: staticCellStyle,
        tooltipComponent: GridToolTips,
      };
      //      }
    });

    setColumnDef([...colDef]);
  }, [data.data.outdata]);

  return (
    <Paper className={classes.paper}>
      <div
        className="ag-theme-balham"
        style={{ height: '100%', width: '100%' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AgGridReact
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          columnDefs={columnDef}
          rowSelection={'single'}
          rowData={data.data.outdata[0].value.filterRows}
          gridOptions={gridOptions}
          overlayLoadingTemplate={'Загрузка данных'}
          overlayNoRowsTemplate={'Нет данных'}
          tooltipShowDelay={0}
          tooltipHideDelay={2000}
        />

        <IconGridMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleFilterOn={handleFilterOn}
          handleFilterOff={handleFilterOff}
          value={value}
          data={{
            title: data.title,
            rows: data.data.outdata[0].value.filterRows,
            col: data.data.outdata[0].value.columns,
          }}
          subItems={subItems}
        />
      </div>
    </Paper>
  );
};

export default AgGridData;
