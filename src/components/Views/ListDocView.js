import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getDocs, raw2int } from '../../services/localData'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { getIcon } from '../../icons'
import { routeToData } from '../../common/constApp'
import { addTab } from '../../store/actions/tabAction'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}))

// function ListItemLink(props) {
//   return <ListItem button {...props} />
// }

export default function SimpleList() {
  const classes = useStyles()
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const docs = getDocs(params.id)

  const handleClick = (id, title) => {
    const item = {
      id,
      title,
      text: title,
    }
    dispatch(addTab(item))
    history.push(routeToData)
  }

  return (
    <div className={classes.root}>
      <List component='nav' aria-label='box for documents'>
        {docs.map((item) => {
          const docName = item.DOC_NAME
          const id = raw2int(item.DOC_ID)
          const iconId = raw2int(item.IMG_INDEX)
          return (
            <ListItem button onClick={() => handleClick(id, docName)} key={id}>
              <ListItemIcon>{getIcon(iconId)}</ListItemIcon>

              <ListItemText primary={docName} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
