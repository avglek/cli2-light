import React, {useState} from 'react'
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import IconGridMenu from '../PopupMenus/IconGridMenu';
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';

import { updateTab } from '../../store/actions/tabAction'

const useStyles = makeStyles((/*theme*/) => ({
  paper: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
}))

const staticCellStyle = {borderRight: '1px solid #aaa'};

const defaultColDef = {
  editable: false,
  resizable: true,
};


const AgGridData = ({data}) => {

  //const {items} = useSelector((state)=>state.tabs)
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const [value, setValue] = useState('')
  const [colId, setColId] = useState('')


  const classes = useStyles()

  if (!data) {
    return null
  }


  const handleClickCell = (event) => {
    setAnchorEl(event.event.target)
    setValue(event.value)
    setColId(event.column.colId)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const gridOptions = {
    //onCellDoubleClicked: handleClickCell,
    onCellContextMenu: handleClickCell,
  }

  const handleFilterOn = () => {
    const rowsData = data.data.outdata[0].value.filterRows

    const filtresData = rowsData.filter((item) => {
      return item[colId] === value
    })

    data.data.outdata[0].value.filterRows = filtresData
    dispatch(updateTab(data))

    handleClose()
  }

  const handleFilterOff = () => {
    const rowsData = data.data.outdata[0].value.rows
    data.data.outdata[0].value.filterRows = rowsData
    dispatch(updateTab(data))
    handleClose()

  }



  const realColumns = data.data.outdata[0].value.columns

  return (
    <Paper className={classes.paper}>
      <div className="ag-theme-balham" style={{height: '100%', width: '100%'}}>
        <AgGridReact
          defaultColDef={defaultColDef}
          rowSelection={'single'}
          rowData={data.data.outdata[0].value.filterRows}
          gridOptions={gridOptions}
          suppressContextMenu={true}
        >

          {
            realColumns.map((item, index) => {
              return (
                <AgGridColumn
                  key={index}
                  headerName={item.name}
                  field={item.value}
                  sortable={true}
                  cellStyle={staticCellStyle}
                />
              )
            })
          }
        </AgGridReact>
        <IconGridMenu
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleFilterOn={handleFilterOn}
          handleFilterOff={handleFilterOff}
          value={value}
          data={{title:data.title,rows:data.data.outdata[0].value.filterRows,col:realColumns}}
        />
      </div>
    </Paper>
  )
}

export default AgGridData;