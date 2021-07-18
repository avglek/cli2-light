import { map } from 'rxjs'
import { ajax } from 'rxjs/ajax'

// import { encode } from 'windows-1251'
// import { decode } from 'utf8'
import { btoa } from 'abab'

// const user = 'OPER_CH'
// const password = 'ch11'
// const url = 'http://localhost:8080/sevstal_ch/servlet/CliServlet'

export const authServise = (value) => {
  const { user, password, resource } = value.auth
  return ajax({
    url: resource,
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(user + ':' + password),
    },
  }).pipe(
    map((response) => {
      console.log(response)
      return response
    })
  )
}
