import { Select } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import styled from 'styled-components';
import { UiFormItem } from '../UiFormItem';

const StyledUiSelect = styled(Select)(
  ({ max_width, fontWeight }) => `
  width: 100%;
  max-width: ${
    max_width
      ? typeof max_width === 'string'
        ? max_width
        : `${max_width}px`
      : '240px'
  };
  justify-content: space-between;

  &:hover :not(.ant-select-open) {
    border-color: #afc7da !important;
  }

  &:not(.ant-select-open) > div.ant-select-selector {
    box-shadow: none !important;
    border-color: #e9e9e9 !important;
  }

  & > div.ant-select-selector {
    font-weight: ${fontWeight ? fontWeight : '400'};
    box-shadow: none !important;
    border-color: #afc7da !important;
    --antd-wave-shadow-color: none;
  }
`
);

const UiSelect = ({ data, control, look, ...props }) => {
  const keyLook = data['LOOKUP_RESULTFIELD']
    ? data['LOOKUP_RESULTFIELD']
    : data['FIELD_NAME'];
  const defaultValue = look.data[0][keyLook];

  // const memoizedOptions = useMemo(
  //   () =>
  //     styledOptions ??
  //     options.map(({ value, displayName }, i) => (
  //       <Select.Option key={`${value}-${i}`} value={value}>
  //         {displayName || value}
  //       </Select.Option>
  //     )),
  //   [options, styledOptions]
  // );
  const memoizedOptions = useMemo(() => {
    return look.data.map((row) => {
      return (
        <Select.Option key={row[keyLook]} value={row[keyLook]}>
          {row[keyLook]}
        </Select.Option>
      );
    });
  });

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
