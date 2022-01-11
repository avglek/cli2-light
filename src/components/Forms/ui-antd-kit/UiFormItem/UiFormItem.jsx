import { Form } from 'antd';
import React from 'react';

import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const StyledUiFormItem = withTheme(styled(Form.Item)`
  margin-bottom: 0;
  max-width: 420px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .ant-form-item-explain,
  .ant-form-item-extra {
    font-size: 18px;
    line-height: 16px;
    color: #939393;
    min-height: unset;
    margin-top: 4px;
  }

  .ant-form-item-label > label {
    position: relative;
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    height: 32px;
    font-size: 18px;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 500;
    line-height: 1.75;
  }
`);

const UiFormItem = ({ children, ...rest }) => (
  <StyledUiFormItem {...rest}>{children}</StyledUiFormItem>
);

export default UiFormItem;
