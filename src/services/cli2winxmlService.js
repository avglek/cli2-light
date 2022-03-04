import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { btoa } from 'abab';
import { parseString } from 'xml2js';
import * as win from 'windows-1251';
import * as utf from 'utf8';
import { createXmlErrorMessage } from '../common/template';

const xmlJsonStream$ = (value) =>
  new Observable((observer) => {
    parseString(
      value,
      { mergeAttrs: true, explicitArray: false },
      (err, result) => {
        if (!err) {
          observer.next(result);
          observer.complete();
        } else {
          observer.error(err);
        }
      }
    );
  });

const body2win = (body) => {
  const winStr = win.encode(body);
  const arr = new Uint8Array(winStr.length);

  for (let i = 0; i < winStr.length; ++i) arr[i] = winStr.charCodeAt(i);

  return arr;
};

// const fetchUserEpic = action$ => action$.pipe(
//   ofType(FETCH_USER),
//   mergeMap(action => ajax.getJSON(`/api/users/${action.payload}`).pipe(
//     map(response => fetchUserFulfilled(response)),
//     catchError(error => of({
//       type: FETCH_USER_REJECTED,
//       payload: error.xhr.response,
//       error: true
//     }))
//   ))
// );

export const cli2winxmlServise = (body, value) => {
  const { user, password, resource } = value.auth;

  return ajax({
    url: resource,
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(user + ':' + password),
    },
    body: body2win(body),
    contentType: 'text/xml; charset=windows-1251',
    responseType: 'text',
  }).pipe(
    map((response) => {
      const buff = response.response;
      const raw = win.encode(buff);
      const xml = utf.decode(raw);
      return xml;
    }),
    catchError((error) => {
      const xmlError = createXmlErrorMessage(error.message);
      return of(xmlError);
    }),

    switchMap((xml) =>
      xmlJsonStream$(xml).pipe(
        map((json) => {
          if (json.EXCEPTION) {
            // return throwError(
            //   () => new Error(`From server: ${json.EXCEPTION}`)
            // );
            return json.EXCEPTION;
          }
          return json.RESPONSE;
        }),
        catchError((error) => {
          console.log('error xml to json: ', xml, error);
          return error;
        })
      )
    )
  );
};
