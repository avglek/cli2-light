import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import { updateTab } from '../../store/actions/tabAction';
import IconGridMenu from '../PopupMenus/IconGridMenu';

const useStyles = makeStyles((/*theme*/) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    boxSizing: 'border-box',
    height: '100%',
    padding: '10px',
  },
  vert: {
    width: '50%',
    height: '100%',
  },
  horiz: {
    width: '100%',
    height: '50%',
  },
}));

const getSearchParams = (str) => {
  if (!str) return [];
  const rex = /\.([a-z-_1-9;]+)/gim;
  const newstr = str.split(rex)[1];
  if (newstr) {
    return newstr.toUpperCase().split(';');
  } else {
    return [];
  }
};

const defaultColDef = {
  editable: false,
  resizable: true,
};

// const sum = (data) =>
//   data.columns.reduce((acc, item) => acc + Number.parseInt(item.size), 0);

const filtersArray = (selectRow, inArray, options) => {
  let out = inArray;

  options.forEach((option) => {
    out = out.filter((item) => item[option.detail] === selectRow[option.doc]);
  });

  return out;
};

const AgTwoGridData = ({ data }) => {
  const classes = useStyles();

  const isVert = data.isVert;

  const pDoc = data.data.outdata.find((i) => i.name === 'P_DOC');
  const pLink = data.data.outdata.find((i) => i.name === 'P_LINKS');
  const pDetail = data.data.outdata.find((i) => i.name === 'P_DETAIL');

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState('');
  const [colId, setColId] = useState('');
  const [subItems, setSubItems] = useState([]);
  const [indexGrid, setIndexGrid] = useState(0);

  const a1 = pLink ? pLink.value.text.split('=') : [];
  const docArr = getSearchParams(a1[0]);
  const detailArr = getSearchParams(a1[1]);

  const docValue = pDoc.value;
  const detailValue = pDetail.value;

  const optionsKey = docArr.map((i, index) => ({
    doc: i,
    detail: detailArr[index],
  }));

  const handleRowClick = (event) => {
    const filterRows = filtersArray(event.data, detailValue.rows, optionsKey);

    data.data.outdata[1].value.filterRows = filterRows;

    dispatch(updateTab(data));
    //    setRows(filterRows);
  };

  const handleClickCell = (event, sourceIndex = 0) => {
    setAnchorEl(event.event.target);
    setValue(event.value);
    setColId(event.column.colId);
    setIndexGrid(sourceIndex);

    const subData = data.data.subDocs.filter(
      (i) => i['FIELD_NAME'] === event.column.colId
    );
    setSubItems(subData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gridOptions = {
    onCellContextMenu: (event) => handleClickCell(event, 0),
    suppressContextMenu: false,
    preventDefaultOnContextMenu: true,
  };

  const gridOptionsDetail = {
    onCellContextMenu: (event) => handleClickCell(event, 1),
    suppressContextMenu: false,
    preventDefaultOnContextMenu: true,
  };

  const handleFilterOn = () => {
    const rowsData = data.data.outdata[indexGrid].value.filterRows;

    const filtresData = rowsData.filter((item) => {
      return item[colId] === value;
    });

    data.data.outdata[indexGrid].value.filterRows = filtresData;
    dispatch(updateTab(data));

    handleClose();
  };

  const handleFilterOff = () => {
    const rowsData = data.data.outdata[indexGrid].value.rows;
    data.data.outdata[indexGrid].value.filterRows = rowsData;
    dispatch(updateTab(data));
    handleClose();
  };

  //todo переделать под использование DeadMonint
  useEffect(() => {
    const initRow = docValue.filterRows[0];
    const filterRows = filtersArray(
      initRow,
      detailValue.filterRows,
      optionsKey
    );
    data.data.outdata[1].value.filterRows = filterRows;
    dispatch(updateTab(data));

    // eslint-disable-next-line
  }, []);

  if (!pLink) {
    return (
      <div className={classes.root}>
        <h1>No support</h1>
      </div>
    );
  }

  const realColumns = data.data.outdata[indexGrid].value.columns;
  return (
    <div className={classes.root}>
      <Paper
        className={classnames(
          classes.paper,
          isVert ? classes.vert : classes.horiz
        )}
      >
        <div
          className="ag-theme-balham"
          style={{ height: '100%', width: '100%' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <AgGridReact
            defaultColDef={defaultColDef}
            rowSelection={'single'}
            rowData={docValue.filterRows}
            gridOptions={gridOptions}
            onRowClicked={handleRowClick}
          >
            {docValue.columns.map((col) => {
              return (
                <AgGridColumn
                  key={col.value}
                  headerName={col.name}
                  field={col.value}
                  sortable={true}
                />
              );
            })}
          </AgGridReact>
        </div>
      </Paper>

      <Paper
        className={classnames(
          classes.paper,
          isVert ? classes.vert : classes.horiz
        )}
      >
        <div
          className="ag-theme-balham"
          style={{ height: '100%', width: '100%' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <AgGridReact
            defaultColDef={defaultColDef}
            rowSelection={'single'}
            rowData={pDetail.value.filterRows}
            gridOptions={gridOptionsDetail}
          >
            {detailValue.columns.map((col) => {
              return (
                <AgGridColumn
                  key={col.value}
                  headerName={col.name}
                  field={col.value}
                  sortable={true}
                />
              );
            })}
          </AgGridReact>
        </div>
      </Paper>
      <IconGridMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleFilterOn={handleFilterOn}
        handleFilterOff={handleFilterOff}
        value={value}
        data={{
          title: data.title,
          rows: data.data.outdata[indexGrid].value.filterRows,
          col: realColumns,
        }}
        subItems={subItems}
      />
    </div>
  );
};

export default AgTwoGridData;
