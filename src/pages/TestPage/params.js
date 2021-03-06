export const ref_343905 = {
  uid: '9uDHX_2OOBcsqgnnTT1Df',
  id: 343905,
  loading: false,
  title: 'Регламентные работы к указанной дате по собственному парку вагонов',
  titleResult:
    'Регламентные работы к указанной дате по собственному парку вагонов',
  call: 'common.RPT_EVENTS_OWN_VAG(?,?,?)',
  params: [
    {
      name: 'P_DOC',
      datatype: 'CURSOR',
      type: 'OUT',
    },
    {
      name: 'P_DTE',
      datatype: 'DATE',
      type: 'IN',
    },
    {
      name: 'P_DNV',
      datatype: 'VARCHAR',
      type: 'IN',
    },
  ],
  form: [
    {
      name: 'P_DTE',
      datatype: 'DATE',
      FIELD_NAME: 'DTE',
      DOC_ID: '0.0',
      FIELD_KIND: '0.0',
      DISPLAY_LABEL: 'Начиная с',
      DISPLAY_SIZE: '10.0',
      CONTROL_TYPE: '1.0',
      READONLY: 'F',
      VISIBLE: 'T',
      PARAM_VISIBLE: 'T',
    },
    {
      name: 'P_DNV',
      datatype: 'VARCHAR',
      FIELD_NAME: 'DNV',
      DOC_ID: '0.0',
      FIELD_KIND: '0.0',
      DISPLAY_LABEL: 'Действ/Не действ',
      DISPLAY_SIZE: '15.0',
      CONTROL_TYPE: '7.0',
      ITEM_LIST: 'Действующие =0\nНедействующие=1\n',
      READONLY: 'F',
      VISIBLE: 'T',
      PARAM_VISIBLE: 'T',
    },
  ],
};

export const ref_341434 = {
  uid: 'dYygsXM6ZJwuWOtrtRO0v',
  id: 341434,
  loading: false,
  title: 'Состояние вагонов по списку',
  call: 'COMMON.VAG_SOST(?,?)',
  params: [
    {
      name: 'P_DOC',
      datatype: 'CURSOR',
      type: 'OUT',
    },
    {
      name: 'P_NVS',
      datatype: 'VARCHAR',
      type: 'IN',
    },
  ],
  form: [
    {
      name: 'P_NVS',
      datatype: 'VARCHAR',
      FIELD_NAME: 'NVS',
      DOC_ID: '0.0',
      FIELD_KIND: '0.0',
      DISPLAY_LABEL: 'Вагоны',
      DISPLAY_SIZE: '12.0',
      CONTROL_TYPE: '13.0',
      READONLY: 'F',
      VISIBLE: 'T',
      REQUIRED: 'T',
      PARAM_VISIBLE: 'T',
      EDIT_MASK: '00000000;1;_',
      VALID_CLASS: 'TNVValid',
    },
  ],
};

export const ref_191303 = {
  uid: 'Rr6KXUVnpT6mR4NybldP3',
  id: 191303,
  loading: false,
  title: 'Неисправности и ремонты своих вагонов',
  titleResult: 'Неисправности и ремонты вагонов группы %SUBGR_RP',
  call: 'sevstal_ch.neisprav_period(?,?,?,?)',
  params: [
    {
      name: 'P_DOC',
      datatype: 'CURSOR',
      type: 'OUT',
    },
    {
      name: 'P_SUBGR_RP',
      datatype: 'VARCHAR',
      type: 'IN',
    },
    {
      name: 'P_D1_Y',
      datatype: 'DATE',
      type: 'IN',
    },
    {
      name: 'P_D2',
      datatype: 'DATE',
      type: 'IN',
    },
  ],
  form: [
    {
      name: 'P_SUBGR_RP',
      datatype: 'VARCHAR',
      group: [
        {
          FIELD_NAME: 'RP',
          DOC_ID: '191303.0',
          FIELD_KIND: '0.0',
          DISPLAY_LABEL: 'РП',
          DISPLAY_SIZE: '10.0',
          CONTROL_TYPE: '11.0',
          READONLY: 'T',
          VISIBLE: 'T',
          PARAM_VISIBLE: 'T',
        },
        {
          FIELD_NAME: 'SUBGR',
          DOC_ID: '191303.0',
          FIELD_KIND: '0.0',
          DISPLAY_LABEL: 'Подгруппа',
          DISPLAY_SIZE: '15.0',
          CONTROL_TYPE: '3.0',
          READONLY: 'F',
          LOOKUP_TABLE: 'V_SUBGR',
          VISIBLE: 'T',
          LOOKUP_KEYFIELDS: 'SUBGR',
          LOOKUP_TABLEORDER: 'SUBGR',
          LOOKUP_RESULTFIELD: 'SUBGR',
          KEY_FIELD: 'CODE',
          NCI_TABLE: 'VAG_TYPE',
          PARAM_VISIBLE: 'T',
        },
      ],
      FIELD_NAME: 'SUBGR_RP',
      DOC_ID: '191303.0',
      FIELD_KIND: '1.0',
      DISPLAY_LABEL: 'Парки',
      DISPLAY_SIZE: '20.0',
      CONTROL_TYPE: '10.0',
      READONLY: 'T',
      VISIBLE: 'T',
      PARAM_VISIBLE: 'T',
      GROUPED_FIELDS: 'RP;SUBGR',
    },
    {
      name: 'P_D1_Y',
      datatype: 'DATE',
      FIELD_NAME: 'D1_Y',
      DOC_ID: '0.0',
      FIELD_KIND: '0.0',
      DISPLAY_LABEL: 'Начиная с',
      DISPLAY_SIZE: '12.0',
      CONTROL_TYPE: '1.0',
      DEFAULT_VALUE: 'StrToStamp(now) - 1',
      READONLY: 'F',
      VISIBLE: 'T',
      PARAM_VISIBLE: 'T',
    },
    {
      name: 'P_D2',
      datatype: 'DATE',
      FIELD_NAME: 'D2',
      DOC_ID: '0.0',
      FIELD_KIND: '0.0',
      DISPLAY_LABEL: 'Заканчивая',
      DISPLAY_SIZE: '12.0',
      CONTROL_TYPE: '1.0',
      DEFAULT_VALUE: 'StrToStamp(now)',
      READONLY: 'T',
      VISIBLE: 'T',
      REQUIRED: 'F',
      FROZE_COLUMN: 'F',
      MOVE_DLG: 'F',
      PARAM_VISIBLE: 'T',
      DISABLE_SORT: 'F',
    },
  ],
  lookTables: [
    {
      TABLE_NAME: 'V_SUBGR',
    },
  ],
  lookdata: {
    meta: 'p_V_SUBGR',
    data: [
      {
        SUBGR: 'КД  ',
      },
      {
        SUBGR: 'СА  ',
      },
      {
        SUBGR: 'КС  ',
      },
      {
        SUBGR: 'КН  ',
      },
      {
        SUBGR: 'ЦБ  ',
      },
      {
        SUBGR: 'ЛК  ',
      },
      {
        SUBGR: 'КР  ',
      },
      {
        SUBGR: 'ЛМ  ',
      },
    ],
  },
};
