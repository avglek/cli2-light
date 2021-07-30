import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
//import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core'
import { RenderData } from './controlTypes'
import { submitForm } from '../../store/actions/formAction'
import { clearTab } from '../../store/actions/tabAction'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    listStyle: 'none',
  },
}))

//const title = 'Поиск вагона по номеру'

const Form = ({ id }) => {
  const classes = useStyles()
  const { items } = useSelector((state) => state.tabs)
  const [controlsValue, setControlsValue] = useState([])
  const dispatch = useDispatch()

  const item = items.find((i) => i.uid === id)
  console.log('item:', item)

  const handleSubmit = (event, formData) => {
    event.preventDefault()
    const params = formData.params.map((i) => {
      const item = controlsValue.find((t) => t.name === i.name)
      return item ? { ...i, data: item.data } : i
    })

    dispatch(
      submitForm({
        uid: formData.uid,
        id: formData.id,
        call: formData.call,
        params,
      })
    )

    dispatch(clearTab({ uid: formData.uid, title: 'result' }))
  }

  const handleControlsValue = (value) => {
    setControlsValue((prev) => {
      const remPrev = prev.filter((i) => i.name !== value.name)
      return [...remPrev, value]
    })
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(event) => handleSubmit(event, item)}
    >
      <Typography variant="h5" color="primary" style={{ marginTop: '2rem' }}>
        {item.form.title}
      </Typography>
      <ul style={{ listStyle: 'none' }}>
        {item.form.map((control, index) => {
          return (
            <li key={index}>
              <RenderData
                control={control}
                controlsValue={handleControlsValue}
              />
            </li>
          )
        })}
      </ul>
      <Button type="submit" variant="contained" color="primary" size="large">
        Отправить
      </Button>
    </form>
  )
}

export default Form
