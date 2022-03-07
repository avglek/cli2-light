import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';

const StyledUiInput = styled(Input)`
  width: 100%;
  border-color: #e9e9e9;
  justify-content: space-between;
  --antd-wave-shadow-color: var(--color__secondary);
  line-height: 1.85;

  //&:selected {
  //  border-color: #AFC7DA;
  //}

  &:hover {
    border-color: #afc7da;
  }

  &:focus {
    box-shadow: none;
    border-color: #afc7da;
  }

  &.ant-row.row.neo-title-container {
    div.ant-col.ant-col-6.col {
      flex: 0 0 auto;
    }
    div.ant-col.ant-col-18.col {
      flex: 0 0 auto;
    }
  }

  & > span:first-of-type > input:first-of-type {
    &:not(.ant-form-item-has-error .ant-input) {
      border-color: #e9e9e9;
      line-height: 1.85;

      &:hover {
        border-color: #afc7da;
      }

      &:focus {
        border-color: #afc7da;
        box-shadow: none !important;
      }
    }
  }
`;

const UiInput = ({ data, control }) => {
  return control ? (
    <Controller
      control={control}
      name={data.name}
      render={({ field, fieldState: { error } }) => {
        return (
          <UiFormItem
            label={data['DISPLAY_LABEL']}
            validateStatus={error ? 'error' : ''}
            status={error ? 'error' : ''}
            hasFeedback={!!error}
            help={error?.message}
          >
            <StyledUiInput
              {...field}
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          </UiFormItem>
        );
      }}
    />
  ) : (
    <StyledUiInput />
  );
};

export default UiInput;
