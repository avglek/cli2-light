import React from 'react'
import { useParams } from 'react-router-dom'
import { getDocs, raw2int } from '../../services/localData'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { getIcon } from '../../icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
}))

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />
}

export default function SimpleList() {
  const classes = useStyles()
  const params = useParams()

  const docs = getDocs(params.id)

  return (
    <div className={classes.root}>
      <List component='nav' aria-label='box for documents'>
        {docs.map((item) => {
          const docName = item.DOC_NAME
          const id = raw2int(item.DOC_ID)
          const href = `/procedure:${id}`
          const iconId = raw2int(item.IMG_INDEX)
          return (
            <ListItemLink href={href} key={id}>
              <ListItemIcon>{getIcon(iconId)}</ListItemIcon>

              <ListItemText primary={docName} />
            </ListItemLink>
          )
        })}
      </List>
    </div>
  )
}
