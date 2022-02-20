import { ofType } from 'redux-observable';
import { catchError, map } from 'rxjs';

import { UPDATE_POST } from '../actions/actionsType';
import { queryUpdate } from '../../common/template';
import { errorDoc, postDoc } from '../actions/docAction';

export const updateEpic = (action$) =>
  action$.pipe(
    ofType(UPDATE_POST),

    map(({ payload }) => {
      const { id, uid, table, fields, rowData, call, inParams } = payload;
      const query = queryUpdate(id, table, fields, rowData);
      console.log(call, inParams);
      return postDoc({ uid, id, xml: query, call, inParams });
    }),
    catchError((error) => {
      console.log('[cli2 error]:', error);
      errorDoc(error);
    })
  );
