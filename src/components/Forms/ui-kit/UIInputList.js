import React from 'react'
import {makeStyles} from '@material-ui/styles';
import {DataGrid} from '@material-ui/data-grid';


const columns = [
  {field: 'id', headerName: 'ID', width: 10},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
];

const rows = [
  {id: 1, firstName: 'Jon'},
  {id: 2, firstName: 'Cersei'},
  {id: 3, firstName: 'Jaime'},
  {id: 4, firstName: 'Arya'},
  {id: 5, firstName: 'Daenerys'},
  {id: 6, firstName: null},
  {id: 7, firstName: 'Ferrara'},
  {id: 8, firstName: 'Rossini'},
  {id: 9, firstName: 'Harvey'},
];

const useStyle = makeStyles((theme)=>(
  {
    root:{
      height:'300px',
      minWidth:'200px',
    },
  }
))


const UIInputList = () => {
  const classes = useStyle()


  return (
    <div className={classes.root}>
      <DataGrid
        hideFooter
        autoHeight
        rows={rows}
        columns={columns}
      />
    </div>
  );


}

export default UIInputList