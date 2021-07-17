import { map, Observable, switchMap } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { btoa } from 'abab'
import { parseString } from 'xml2js'
import { encode } from 'windows-1251'
import { decode } from 'utf8'

const user = 'OPER_CH'
const password = 'ch11'
const url = 'http://localhost:8080/sevstal_ch/servlet/CliServlet'

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

export const cli2xmlServise = (body) =>
  ajax({
    url,
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
      //const raw = new ArrayBuffer(buff.length * 2)
      const raw = encode(buff)

      const xml = decode(raw)

      return xml
    }),
    //tap((x) => console.log('start:', x)),
    switchMap((xml) => xmlJsonStream$(xml).pipe(map((json) => json.RESPONSE)))
  )
