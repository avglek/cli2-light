import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import { AgGridReact } from 'ag-grid-react';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const getSerchParams = (str) => {
  const rex = /\.([a-z-_1-9;]+)/gim;
  const newstr = str.split(rex)[1];
  if (newstr) {
    return newstr.toUpperCase().split(';');
  } else {
    return [];
  }
};

const TwoDataGrid = ({ data, size }) => {
  const classes = useStyles();
  const [selectRow, setSelectRow] = useState({});

  const pDoc = data.data.outdata.find((i) => i.name === 'P_DOC');
  const pLink = data.data.outdata.find((i) => i.name === 'P_LINKS');
  const pDetail = data.data.outdata.find((i) => i.name === 'P_DETAIL');

  const a1 = pLink.value.text.split('=');
  const docArr = getSerchParams(a1[0]);
  const detailArr = getSerchParams(a1[1]);

  const value = pDoc.value;
  const valueDep = pDetail.value;

  const behavior = {
    columnResizeMode: 'growAndShrink',
  };

  const appearance = {
    alternationCount: 2,
    //showRowHeader: true,
    //showRowHeaderNumber: true,
    allowHover: true,
    //allowHeaderHover: false,
  };

  // const paging = {
  //   enabled: true,
  // }

  // const pager = {
  //   visible: true,
  // }

  const sorting = {
    enabled: true,
    sortToggleThreeStates: false,
  };

  const selection = {
    enabled: true,
    mode: 'one',
  };

  // const editing = {
  //   enabled: true,
  // }

  const dataSource = new Smart.DataAdapter({
    dataSource: value.rows,
  });

  const dataSourceDep = new Smart.DataAdapter({
    dataSource: valueDep.rows.filter((row) => {
      let exp = true;
      docArr.forEach((idx) => {
        exp = exp && selectRow[idx] === row[idx];
      });
      return exp;
    }),
  });

  const realColumns = value.columns.filter((col) => col['FIELD_NAME']);
  const columns = realColumns.map((col) => ({
    label: col['DISPLAY_LABEL'],
    dataField: col['FIELD_NAME'],
    width: 'auto',
  }));

  const realColumnsDep = valueDep.columns.filter((col) => col['FIELD_NAME']);
  const columnsDep = realColumnsDep.map((col) => ({
    label: col['DISPLAY_LABEL'],
    dataField: col['FIELD_NAME'],
    width: 'auto',
  }));

  const handleRowClick = (event) => {
    const row = docArr.reduce((acc, i) => {
      return { ...acc, [i]: event.detail.row.data[i] };
    }, {});

    setSelectRow(() => {
      return docArr.reduce((acc, i) => {
        return { ...acc, [i]: event.detail.row.data[i] };
      }, {});
    });
  };

  return (
    <div
      className={classes.root}
      // style={{
      //   '--smart-grid-default-width': '100%',
      //   '--smart-grid-default-height': `${size.height}px`,
      // }}
    >
      <div className={classes.panel}>
        <AgGridReact
          onRowClick={handleRowClick}
          dataSource={dataSource}
          columns={columns}
          appearance={appearance}
          behavior={behavior}
          selection={selection}
          // paging={paging}
          // pager={pager}
          sorting={sorting}
          // editing={editing}
        ></AgGridReact>
      </div>
      <div className={classes.panel}>
        <Grid
          dataSource={dataSourceDep}
          columns={columnsDep}
          appearance={appearance}
          behavior={behavior}
          selection={selection}
          // paging={paging}
          // pager={pager}
          sorting={sorting}
          // editing={editing}
        ></Grid>
      </div>
    </div>
  );
};

export default TwoDataGrid;
