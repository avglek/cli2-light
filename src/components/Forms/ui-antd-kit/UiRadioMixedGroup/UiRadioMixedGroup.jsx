import { Radio, Select, Space, Form } from 'antd';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';
import styled from 'styled-components';

const StyledUiRadioMixedGroup = styled(Radio.Group)(
  () => `
  width: 100%;
  & > div.
  `
);

const StyledFormItem = styled(Form.Item)`
  //display: flex;
  //flex-direction: row;
`;

const StyledSelect = styled(Select)(
  ({ max_width, fontWeight }) => `
  max-width: ${
    max_width
      ? typeof max_width === 'string'
        ? max_width
        : `${max_width}px`
      : '80px'
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

const StyledSpace = styled(Space)`
  width: 100%;
`;

const UiRadioMixedGroup = ({ data, control, look, ...props }) => {
  const renderRadio = useCallback(
    (field) => {
      if (!data['GROUPED_FIELDS']) {
        return null;
      }
      const items = data.group;

      return (
        <StyledSpace direction="vertical">
          {items.map((item, index) => {
            if (item['CONTROL_TYPE'] === '11.0') {
              return (
                <StyledFormItem>
                  <Radio key={index} value={item['DISPLAY_LABEL']}>
                    {item['DISPLAY_LABEL']}
                  </Radio>
                </StyledFormItem>
              );
            } else if (item['CONTROL_TYPE'] === '3.0') {
              return (
                <StyledFormItem>
                  <Radio key={index}>{`${item['DISPLAY_LABEL']}: `}</Radio>
                  <StyledSelect
                    {...field}
                    size={'large'}
                    dropdownStyle={{ zIndex: '1500' }}
                    listHeight={150}
                  >
                    {look.data.map((row) => {
                      const keyLook = item['LOOKUP_KEYFIELDS'];
                      return (
                        <Select.Option key={row[keyLook]} value={row[keyLook]}>
                          {row[keyLook]}
                        </Select.Option>
                      );
                    })}
                  </StyledSelect>
                </StyledFormItem>
              );
            } else {
              return null;
            }
          })}
        </StyledSpace>
      );
    },
    [data, look]
  );

  return control ? (
    <Controller
      name={data.name}
      //defaultValue={defaultValue}
      control={control}
      render={({ ref, field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          help={error?.message}
        >
          <StyledUiRadioMixedGroup {...field}>
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
