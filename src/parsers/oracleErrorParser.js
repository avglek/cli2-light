import { updateTab } from '../store/actions/tabAction';

export const oracleErrorParser = ({ uid, json, value, call, inParams }) => {
  const errTab = {
    uid,
    title: 'Ошибка запроса',
    titleDoc: 'Ошибка запроса',
    loading: false,
    call,
    value,
    inParams,
    error: json.message,
  };

  return updateTab(errTab);
};
