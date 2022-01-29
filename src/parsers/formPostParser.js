import { queryProc } from '../common/template';
import { postDoc } from '../store/actions/docAction';

//todo
export function formPostParser(uid, item, value) {
  const inParams = item.params.map((val) => {
    const result = { ...val };

    if (val.type === 'IN') {
      const formItem = item.form.find((i) => i.name === val.name);
      if (formItem) {
        if (formItem['FIELD_NAME'] === value.id) {
          result.data = value.value;
        } else {
          result.data = formItem['DEFAULT_VALUE'];
        }
      }
    }
    return result;
  });

  const query = queryProc(item.id, item.call, inParams);

  return postDoc({ uid, xml: query, call: item.call, inParams });
}
