import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import { UiFormItem } from '../UiFormItem';

const StyledTextArea = styled(Input.TextArea)`
  width: 100%;
  border-color: #e9e9e9;
  justify-content: space-between;
  --antd-wave-shadow-color: var(--color__secondary);
  line-height: 1.85;

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

const UiTextarea = ({ data, control, ...props }) => {
  return control ? (
    <Controller
      control={control}
      name={data.name}
      //defaultValue={props.defaultValue}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          position={'top'}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          hasFeedback={!!error}
          help={error?.message}
        >
          <StyledTextArea
            rows={5}
            {...field}
            //disabled={props.disabled}
          />
        </UiFormItem>
      )}
    />
  ) : (
    <StyledTextArea
      rows={5}
      //placeholder={props.placeholder}
      //styles={props.styles}
      // onChange={props.onChange}
      // disabled={props.disabled}
    />
  );
};

export default UiTextarea;
