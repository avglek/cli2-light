import { ajax } from 'rxjs/ajax'
import { btoa } from 'abab'
//import { delay } from 'rxjs'

export const authServise = (value) => {
  const { user, password, resource } = value.auth
  return ajax({
    url: resource,
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + btoa(user + ':' + password),
    },
  })
}
