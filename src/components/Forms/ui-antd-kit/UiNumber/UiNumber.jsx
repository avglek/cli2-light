import React from 'react';
import { InputNumber } from 'antd';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';

const StyledUiNumber = styled(InputNumber)`
  width: 100%;
`;

const UiNumber = ({ data, control, ...props }) => {
  return control ? (
    <Controller
      control={control}
      name={data.name}
      defaultValue={data['DEFAULT_VALUE']}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          hasFeedback={!!error}
          help={error?.message || props.help}
        >
          <StyledUiNumber
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
          />
        </UiFormItem>
      )}
    />
  ) : (
    <StyledUiNumber {...props} />
  );
};

export default UiNumber;
