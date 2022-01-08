export const ref_343905 =
  {
    'uid': '9uDHX_2OOBcsqgnnTT1Df',
    'id': 343905,
    'loading': false,
    'title': 'Регламентные работы к указанной дате по собственному парку вагонов',
    'titleResult': 'Регламентные работы к указанной дате по собственному парку вагонов',
    'call': 'common.RPT_EVENTS_OWN_VAG(?,?,?)',
    'params': [
      {
        'name': 'P_DOC',
        'datatype': 'CURSOR',
        'type': 'OUT'
      },
      {
        'name': 'P_DTE',
        'datatype': 'DATE',
        'type': 'IN'
      },
      {
        'name': 'P_DNV',
        'datatype': 'VARCHAR',
        'type': 'IN'
      }
    ],
    'form': [
      {
        'name': 'P_DTE',
        'datatype': 'DATE',
        'FIELD_NAME': 'DTE',
        'DOC_ID': '0.0',
        'FIELD_KIND': '0.0',
        'DISPLAY_LABEL': 'Начиная с',
        'DISPLAY_SIZE': '10.0',
        'CONTROL_TYPE': '1.0',
        'READONLY': 'F',
        'VISIBLE': 'T',
        'PARAM_VISIBLE': 'T'
      },
      {
        'name': 'P_DNV',
        'datatype': 'VARCHAR',
        'FIELD_NAME': 'DNV',
        'DOC_ID': '0.0',
        'FIELD_KIND': '0.0',
        'DISPLAY_LABEL': 'Действ/Не действ',
        'DISPLAY_SIZE': '15.0',
        'CONTROL_TYPE': '7.0',
        'ITEM_LIST': 'Действующие =0\nНедействующие=1\n',
        'READONLY': 'F',
        'VISIBLE': 'T',
        'PARAM_VISIBLE': 'T'
      }
    ]
  }

  export const ref_341434 = {
    "uid": "dYygsXM6ZJwuWOtrtRO0v",
    "id": 341434,
    "loading": false,
    "title": "Состояние вагонов по списку",
    "call": "COMMON.VAG_SOST(?,?)",
    "params": [
      {
        "name": "P_DOC",
        "datatype": "CURSOR",
        "type": "OUT"
      },
      {
        "name": "P_NVS",
        "datatype": "VARCHAR",
        "type": "IN"
      }
    ],
    "form": [
      {
        "name": "P_NVS",
        "datatype": "VARCHAR",
        "FIELD_NAME": "NVS",
        "DOC_ID": "0.0",
        "FIELD_KIND": "0.0",
        "DISPLAY_LABEL": "Вагоны",
        "DISPLAY_SIZE": "12.0",
        "CONTROL_TYPE": "13.0",
        "READONLY": "F",
        "VISIBLE": "T",
        "REQUIRED": "T",
        "PARAM_VISIBLE": "T",
        "EDIT_MASK": "00000000;1;_",
        "VALID_CLASS": "TNVValid"
      }
    ]
  }
