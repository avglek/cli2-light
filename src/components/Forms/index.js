import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import { RenderData } from './controlTypes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    listStyle: 'none',
  },
}))

const title = 'Поиск вагона по номеру'

const Form = ({ id }) => {
  const classes = useStyles()
  const { items } = useSelector((state) => state.tabs)
  const item = items.find((i) => i.uid === id)
  console.log(item.form)



  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Typography variant='h5' color='primary' style={{ marginTop: '2rem' }}>
        {item.form.title}
      </Typography>
      <ul style={{ listStyle: 'none' }}>
        {item.form.map((control, index) => {
          return (
            <li key={index}>
              <RenderData control={control} />
            </li>
          )
        })}
      </ul>
    </form>
  )
}

export default Form
