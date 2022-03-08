import { Radio, Select, Space, Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';
import styled from 'styled-components';

const StyledUiRadioMixedGroup = styled(Radio.Group)`
  width: 100%;
`;

const StyledUiMixed = styled.div`
  width: 100%;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  justify-content: space-between;

  &:hover :not(.ant-select-open) {
    border-color: #afc7da !important;
  }

  &:not(.ant-select-open) > div.ant-select-selector {
    box-shadow: none !important;
    border-color: #e9e9e9 !important;
  }

  & > div.ant-select-selector {
    font-weight: 400;
    box-shadow: none !important;
    border-color: #afc7da !important;
    --antd-wave-shadow-color: none;
  }
`;

const StyledSpace = styled(Space)`
  width: 100%;
`;

const UiRadioMixedGroup = ({ data, control, look, setValue, ...props }) => {

  const [optionRadio, setOptionRadio] = useState(
    data.group[0]['DISPLAY_LABEL']
  );
  const [optionSelect, setOptionSelect] = useState('');

  const onChange = useCallback((event) => {
    setOptionRadio(event.target.value);
  }, []);

  const onChangeSelect = useCallback((value) => {
    setOptionSelect(value);
  }, []);

  const renderRadio = useCallback(
    (field) => {
      if (!data['GROUPED_FIELDS']) {
        return null;
      }
      const items = data.group;

      return (
        <StyledSpace direction="vertical">
          {items?.map((item, index) => {
            //if (item['CONTROL_TYPE'] === '11.0') {
            return (
              <StyledUiMixed key={index}>
                <Radio value={item['DISPLAY_LABEL']}>
                  {item['DISPLAY_LABEL']}
                </Radio>
                {item['CONTROL_TYPE'] === '3.0' ? (
                  <StyledSelect
                    size={'large'}
                    dropdownStyle={{ zIndex: '1500' }}
                    listHeight={150}
                    disabled={!(optionRadio === item['DISPLAY_LABEL'])}
                    onChange={onChangeSelect}
                    defaultValue={look.data[0][item['LOOKUP_KEYFIELDS']]}
                  >
                    {look.data?.map((row) => {
                      const keyLook = item['LOOKUP_KEYFIELDS'];

                      return (
                        <Select.Option key={row[keyLook]} value={row[keyLook]}>
                          {row[keyLook]}
                        </Select.Option>
                      );
                    })}
                  </StyledSelect>
                ) : null}
              </StyledUiMixed>
            );
          })}
        </StyledSpace>
      );
    },
    [data, look, optionRadio]
  );

  useEffect(() => {
    const item = data.group?.find((i) => i['CONTROL_TYPE'] === '3.0');

    if (optionSelect === '') {
      setOptionSelect(look.data[0][item['LOOKUP_KEYFIELDS']]);
    }

    if (optionRadio === item['DISPLAY_LABEL']) {
      setValue(data.name, optionSelect);
    } else {
      setValue(data.name, optionRadio);
    }
  }, [optionRadio, optionSelect, data.name]);

  return control ? (
    <Controller
      name={data.name}
      control={control}
      render={({ ref, field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          position={'top'}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          help={error?.message}
        >
          <StyledUiRadioMixedGroup
            {...field}
            onChange={onChange}
            value={optionRadio}
            //           defaultValue={data.group[0]['DISPLAY_LABEL']}
          >
            {renderRadio(field)}
          </StyledUiRadioMixedGroup>
        </UiFormItem>
      )}
    />
  ) : (
    <StyledUiRadioMixedGroup>{renderRadio}</StyledUiRadioMixedGroup>
  );
};

export default UiRadioMixedGroup;
