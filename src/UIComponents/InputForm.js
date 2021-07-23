import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
//import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SendIcon from '@material-ui/icons/Send'
import { red } from '@material-ui/core/colors'

import InputList from './InputList'

const useStyles = makeStyles({
  root: {
    minWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  button: {
    marginRight: '10px',
  },
})

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ]

export default function InputForm() {
  const classes = useStyles()
  // const [personName, setPersonName] = React.useState([])

  // const handleChange = (event) => {
  //   setPersonName(event.target.value)
  // }
  // const handleChangeMultiple = (event) => {
  //   const { options } = event.target
  //   const value = []
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value)
  //     }
  //   }
  //   setPersonName(value)
  // }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label='recipe' className={classes.avatar}>
              A
            </Avatar>
          </div>
        }
        action={
          <div>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
            <IconButton aria-label='settings'>
              <CloseIcon />
            </IconButton>
          </div>
        }
        title='Shrimp and Chorizo Paella'
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <Grid
          container
          direction='column'
          justifyContent='space-around'
          alignItems='center'
          spacing={4}
        >
          <InputList />
        </Grid>
      </CardContent>

      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}
