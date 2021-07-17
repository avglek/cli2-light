import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { btoa } from 'abab'
import iconv from 'iconv-lite'
import convert from 'xml-js'
import { requestTree } from './template'

const user = 'OPER_CH'
const password = 'ch11'
const url = 'http://localhost:8080/sevstal_ch/servlet/CliServlet'

const options = {
  compact: true,
  ignoreAttributes: false,
  attributesKey: false,
  addParent: false,
  instructionHasAttributes: true,
}

const toJSObj = (xml) => {
  const out = convert.xml2js(xml, options)
  return out
}

export const postCli$ = (body) => {
  iconv.skipDecodeWarning = true
  return ajax({
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
      const res = iconv.encode(buff, 'win1251')

      const xml = iconv.decode(res, 'utf8')

      let jsonObj = null

      try {
        jsonObj = toJSObj(xml)
      } catch (error) {
        console.log(error.message)
      }
      return jsonObj
    }),
    catchError((error) => {
      console.log('error: ', error)
      return of(error)
    })
  )
}

export const getTree = () => {
  return postCli$(requestTree)
}
