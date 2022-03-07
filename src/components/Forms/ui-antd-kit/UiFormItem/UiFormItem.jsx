import { Form } from 'antd';
import React from 'react';

import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const StyledUiFormItem = withTheme(styled(Form.Item)`
  margin-bottom: 0;
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .ant-form-item-label {
    width: 196px;
  }

  .ant-form-item-label > label {
    position: relative;
    display: inline-flex;
    align-items: ${(props) =>
      props.position === 'top' ? 'flex-start' : 'cerner'};

    height: 100%;
    font-size: 18px;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 500;
    line-height: 1.75;
  }

  .ant-form-item-control {
    padding-right: 104px;
    padding-left: 12px;
    padding-top: 3px;
  }
`);

const UiFormItem = ({ children, ...rest }) => (
  <StyledUiFormItem {...rest}>{children}</StyledUiFormItem>
);

export default UiFormItem;
