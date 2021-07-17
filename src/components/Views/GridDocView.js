import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { getDocs, raw2int } from '../../services/localData'
import { getSvgImg } from '../../icons'
import { routeToData } from '../../common/constApp'
import { addTab } from '../../store/actions/tabAction'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardAction: {
    height: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

function CardBody({ classes, item }) {
  const history = useHistory()
  const dispatch = useDispatch()

  const docName = item.DOC_NAME
  const id = raw2int(item.DOC_ID)
  const iconId = raw2int(item.IMG_INDEX)

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
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardAction}
        onClick={() => handleClick(id, docName)}
      >
        <CardContent>
          {getSvgImg(iconId)}
          <Typography variant='h5' component='h3' align='justify'>
            {docName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default function GridDocView() {
  const classes = useStyles()

  const params = useParams()

  const docs = getDocs(params.id)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {docs.map((el, index) => {
          return (
            <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3}>
              <CardBody classes={classes} item={el} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
