import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const StyletText = styled(Typography.Text)`
  margin: 20px 20px;
  box-sizing: border-box;
  display: inline-block;
`;

export const RenderError = ({ id }) => {
  const { items } = useSelector((state) => state.tabs);
  const item = items.find((i) => i.uid === id);

  return <StyletText type="danger">{item.error}</StyletText>;
};
