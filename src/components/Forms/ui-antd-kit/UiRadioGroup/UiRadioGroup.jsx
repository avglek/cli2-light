import React, { useCallback } from 'react';
import { Radio, Space } from 'antd';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';

const StyledUiRadioGroup = styled(Radio.Group)(
  () => `
  width: 100%;
  `
);

const UiRadioGroup = ({ data, control, ...props }) => {
  const defaultValue = '0';

  const renderRadio = useCallback(
    (field) => {
      if (!data['ITEM_LIST']) {
        return null;
      }

      const items = data['ITEM_LIST'].trim().split('\n');

      return (
        <Radio.Group {...field}>
          <Space direction="vertical">
            {items.map((item, index) => {
              const options = item.trim().split('=');
              return (
                <Radio key={index} value={options[1]}>
                  {options[0]}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      );
    },
    [data]
  );

  return control ? (
    <Controller
      name={data.name}
      defaultValue={defaultValue}
      control={control}
      render={({ ref, field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          help={error?.message}
        >
          <StyledUiRadioGroup>{renderRadio(field)}</StyledUiRadioGroup>
        </UiFormItem>
      )}
    />
  ) : (
    <StyledUiRadioGroup>{renderRadio}</StyledUiRadioGroup>
  );
};

export default UiRadioGroup;
