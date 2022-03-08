import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const StyledToolTips = styled.div`
  width: 80px;
  height: 30px;
  border: 1px solid black;
  background-color: #e8e8b7;
  padding: 2px 10px;
`;

export const GridToolTips = ({ children, ...props }) => {

  return (
    <StyledToolTips>
      <Typography.Title level={5}>Title</Typography.Title>
    </StyledToolTips>
  );
};
