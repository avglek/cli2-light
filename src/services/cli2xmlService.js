import { map, Observable, switchMap, throwError, tap } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { btoa } from 'abab'
import { parseString } from 'xml2js'
import { encode } from 'windows-1251'
import { decode } from 'utf8'

const xmlJsonStream$ = (value) =>
  new Observable((observer) => {
    parseString(
      value,
      { mergeAttrs: true, explicitArray: false },
      (err, result) => {
        if (!err) {
          observer.next(result)
          observer.complete()
        } else {
          observer.error(err)
        }
      }
    )
  })

export const cli2xmlServise = (body, value) => {
  const { user, password, resource } = value.auth

  return ajax({
    url: resource,
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(user + ':' + password),
    },
    body,
    contentType: 'text/xml',
    responseType: 'text',
  }).pipe(
    map((response) => {
      const buff = response.response
      const raw = encode(buff)
      const xml = decode(raw)

      return xml
    }),

    switchMap((xml) =>
      xmlJsonStream$(xml).pipe(
        map((json) => {
          if (json.EXCEPTION) {
            return throwError(() => new Error(`From server: ${json.EXCEPTION}`))
          }
          return json.RESPONSE
        })
      )
    ),
    tap((x) => console.log('start:', x))
  )
}
