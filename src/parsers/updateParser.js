import { queryProc } from '../common/template';
import { postDoc } from '../store/actions/docAction';

export const updateParser = ({ uid, json, call, inParams, value, id }) => {
  const query = queryProc(id, call, inParams);
  return postDoc({ uid, xml: query, call, id, inParams });
};
