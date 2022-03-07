import { Select } from 'antd';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import styled from 'styled-components';
import { UiFormItem } from '../UiFormItem';

const StyledUiSelect = styled(Select)`
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
    box-shadow: none !important;
    border-color: #afc7da !important;
    --antd-wave-shadow-color: none;
  }
`;

const UiSelect = ({ data, control, look, ...props }) => {
  //LOOKUP_DISPLAYFIELDS
  const keyLook = data['LOOKUP_RESULTFIELD']
    ? data['LOOKUP_RESULTFIELD']
    : data['FIELD_NAME'];

  const displayLook = data['LOOKUP_DISPLAYFIELDS']
    ? data['LOOKUP_DISPLAYFIELDS']
    : data['FIELD_NAME'];

  const defaultValue = look.data[0][keyLook];

  const memoizedOptions = useMemo(() => {
    return look.data.map((row) => {
      return (
        <Select.Option key={row[keyLook]} value={row[keyLook]}>
          {row[displayLook]}
        </Select.Option>
      );
    });
  }, [look.data, keyLook]);

  return control ? (
    <Controller
      control={control}
      name={data.name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          help={error?.message}
        >
          <StyledUiSelect
            size={'large'}
            dropdownStyle={{ zIndex: '1500' }}
            listHeight={150}
            defaultValue={defaultValue}
            {...field}
          >
            {memoizedOptions}
          </StyledUiSelect>
        </UiFormItem>
      )}
    />
  ) : (
    <StyledUiSelect>{memoizedOptions}</StyledUiSelect>
  );
};

export default UiSelect;
