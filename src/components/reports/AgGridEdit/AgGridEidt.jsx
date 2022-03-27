import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import { clearTab, updateTab } from '../../../store/actions/tabAction';
import { customAlphabet } from 'nanoid';

import { Paper } from '@material-ui/core';
import DialogRemoveRows from '../../Dialog/DialogRemoveRows';
import { UiInputTextEdit } from './CustomEdits';
import { updatePost } from '../../../store/actions/updateAction';
import {
  styleValidateNV,
  validateNV,
} from './customValidated/colunmsVaildated';
import DialogErrorNV from '../../Dialog/DialogErrorNV';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);

const useStyles = makeStyles((/*theme*/) => ({
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  trash: {
    width: '20px',
    height: '20px',
  },
  form: {
    width: '100%',
    height: '100%',
  },
}));

const staticCellStyle = { borderRight: '1px solid #aaa' };

const AgGridEdit = ({ data }) => {
  const dispatch = useDispatch();
  const gridRef = useRef();

  const [columnDef, setColumnDef] = useState();
  const [openRemove, setOpenRemove] = useState(false);
  const [viewRows, setViewRows] = useState([]);
  const [errors, setErrors] = useState('');

  const classes = useStyles();
  const rows = data.data.outdata[0].value.filterRows;

  const isEdit = data.isEditable;
  const realColumns = useMemo(() => data.data.outdata[0].value.columns, [data]);

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: true,
      //flex: 1,
      //minWidth: 100,
      filter: false,
      resizable: true,
    };
  }, []);

  const gridOptions = {
    suppressContextMenu: false,
    preventDefaultOnContextMenu: true,
  };

  const setRows = useCallback(
    (currentRows) => {
      data.data.outdata[0].value.filterRows = currentRows;
      data.isDocChanged = true;
      dispatch(updateTab(data));
    },
    [data, dispatch]
  );

  const emptyColumns = useMemo(
    () =>
      realColumns.reduce((acc, item) => {
        acc[item.value] = '';
        return acc;
      }, {}),
    [realColumns]
  );

  const handleAddRow = useCallback(
    (rowsData = [], over = false) => {
      if (rowsData.length > 0) {
        const newRowsData = rowsData
          .map((row) => {
            const id = nanoid();
            return { ...row, id, RowState: 4 };
          })
          .filter((row) => row.NV !== '');
        if (over) {
          const removeRows = data.data.outdata[0].value.filterRows.map(
            (row) => ({ ...row, RowState: 2, nullfields: '2' })
          );
          setRows([...removeRows, ...newRowsData]);
        } else {
          setRows([...data.data.outdata[0].value.filterRows, ...newRowsData]);
        }
      } else {
        const newRow = emptyColumns;
        const id = nanoid();
        setRows([
          ...data.data.outdata[0].value.filterRows,
          { ...newRow, id, RowState: 4 },
        ]);
      }
    },
    [data.data.outdata, emptyColumns, setRows]
  );

  const savedData = useCallback(() => {
    const changedData = data.data.outdata[0].value.filterRows;
    const originalData = data.data.outdata[0].value.rows;

    const removeRowsData = changedData.filter(
      (row) => row.RowState === 2 && row.ROWID
    );

    const addRowsData = changedData.filter(
      (row) => !row.ROWID && row.RowState === 4
    );

    const editData = [];
    originalData.forEach((row) => {
      const editRow = changedData.find(
        (i) => i.ROWID === row.ROWID && i.RowState === 8
      );
      if (row.ROWID === editRow?.ROWID) {
        editData.push({ ...row, RowState: 1 });
        const keys = Object.keys(editRow);
        const fields = keys.filter((i) => row[i] !== editRow[i] && i !== 'id');
        const updateRow = {};
        for (const fieldsKey of fields) {
          updateRow[fieldsKey] = editRow[fieldsKey];
        }
        editData.push({ ...updateRow });
      }
    });

    const updateData = [...removeRowsData, ...addRowsData, ...editData];

    dispatch(
      updatePost({
        id: data.id,
        uid: data.uid,
        table: data.data.outdata[1].value.text,
        fields: data.data.outdata[0].value.columns,
        rowData: updateData,
        call: data.call,
        inParams: data.inParams,
      })
    );
    dispatch(clearTab({ uid: data.uid, title: data.title, call: data.call }));
  }, [
    data.data.outdata,
    data.call,
    data.id,
    data.inParams,
    data.title,
    data.uid,
    dispatch,
  ]);

  const handleSaveData = useCallback(() => {
    const viewAllData = data.data.outdata[0].value.filterRows.filter(
      (row) => row.RowState !== 2
    );

    const error = validateNV(viewAllData);
    setErrors(error);
    if (!error) {
      savedData();
    }
  }, [data.data.outdata, savedData]);

  const handleRemoveRows = useCallback(() => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      setOpenRemove(true);
    }
  }, []);

  const handleRemoveSelectedRows = useCallback(
    (confirm) => {
      if (confirm) {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedRowsId = selectedNodes.map((node) => {
          const res = node.data.id;
          return res;
        });

        const rows = data.data.outdata[0].value.filterRows;

        const newRows = rows.map((row) => {
          const marker = !selectedRowsId.includes(row.id);
          if (marker) {
            return { ...row };
          }
          return { ...row, RowState: 2, nullfields: '2' };
        });

        setRows(newRows);
      }
      setOpenRemove(false);
    },
    [setRows, data.data.outdata]
  );

  const onCellValueChanged = useCallback(
    (event) => {
      const rows = data.data.outdata[0].value.filterRows;

      const updatedRows = rows.map((row) => {
        if (row.id === event.data.id) {
          if (event.data?.RowState) {
            return { ...event.data };
          } else {
            return { ...event.data, RowState: 8 };
          }
        } else {
          return { ...row };
        }
      });
      setRows(updatedRows);
    },
    [data.data.outdata, setRows]
  );

  const onGridRead = useCallback((params) => {
    // console.log('great read:', params);
    // const allColumnIds = [];
    // params.columnApi.getAllColumns().forEach((column) => {
    //   allColumnIds.push(column.getId());
    // });
    // params.columnApi.autoSizeColumns(allColumnIds, true);
  }, []);

  useEffect(() => {
    setViewRows(rows.filter((row) => row.RowState !== 2));
  }, [rows]);

  useEffect(() => {
    if (isEdit) {
      const rows = data.data.outdata[0].value.filterRows;

      data.data.outdata[0].value.filterRows = rows.map((item) => ({
        ...item,
        id: nanoid(),
      }));

      const isNV = !!data.data.outdata[0].value.columns.find(
        (i) => i.value === 'NV'
      );

      const item = {
        ...data,
        onAddRow: handleAddRow,
        onSaveData: handleSaveData,
        onRemoveRows: handleRemoveRows,
        isDocChanged: false, //docChanged,
        isNV,
      };
      dispatch(updateTab({ ...item }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const vags = viewRows.reduce((acc, row) => {
      return [...acc, row.NV];
    }, []);
    const colDef = [...data.data.outdata[0].value.columns].map((item) => {
      switch (item.type) {
        case 'string':
          return {
            headerName: item.name,
            field: item.value,
            sortable: true,
            cellStyle: (params) =>
              item.value === 'NV'
                ? styleValidateNV(params, vags)
                : staticCellStyle,
            cellEditor: UiInputTextEdit,
            editable: isEdit,
          };
        default:
          return {
            headerName: item.name,
            field: item.value,
            sortable: true,
            cellStyle: staticCellStyle,
            editable: isEdit,
          };
      }
    });

    setColumnDef([
      {
        headerName: 'Выбор',
        field: 'make',
        cellStyle: staticCellStyle,
        checkboxSelection: isEdit,
      },
      ...colDef,
    ]);
  }, [data.data.outdata, isEdit, viewRows]);

  return (
    <Paper className={classes.paper}>
      <div
        className="ag-theme-balham"
        style={{ height: '100%', width: '100%' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridRead}
          defaultColDef={defaultColDef}
          columnDefs={columnDef}
          // rowData={data.data.outdata[0].value.filterRows.filter(
          //   (row) => row.RowState !== 2
          // )}
          rowData={viewRows}
          gridOptions={gridOptions}
          overlayLoadingTemplate={'Загрузка данных'}
          overlayNoRowsTemplate={'Нет данных'}
          rowSelection={'multiple'}
          onCellValueChanged={onCellValueChanged}
        />
      </div>

      <DialogRemoveRows
        open={openRemove}
        handleClose={handleRemoveSelectedRows}
      />
      <DialogErrorNV
        open={!!errors}
        error={errors}
        handleClose={() => setErrors('')}
      />
    </Paper>
  );
};

export default AgGridEdit;
