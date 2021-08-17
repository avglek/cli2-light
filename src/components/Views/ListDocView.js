import React from 'react'
import { raw2int } from '../../utils/docs'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { getIcon } from '../../icons'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ListDocView({ docs, onDocClick }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="box for documents">
        {docs.map((item) => {
          const docName = item.DOC_NAME
          const id = raw2int(item.DOC_ID)
          const iconId = raw2int(item.IMG_INDEX)
          return (
            <ListItem button onClick={() => onDocClick(id)} key={id}>
              <ListItemIcon>{getIcon(iconId)}</ListItemIcon>

              <ListItemText primary={docName} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
