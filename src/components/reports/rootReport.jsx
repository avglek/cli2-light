import React from 'react';
import { useSelector } from 'react-redux';
import DataPlainText from './DataPlainText';
import AgGridData from './AgGridData';
import AgTwoGridData from './AgTwoGridData';

const def = <h1>Default</h1>;

const views = {
  TfrmTable: AgGridData,
  TfrmTwoTables: AgTwoGridData,
  TfrmText: DataPlainText,
  //  TfrmFlash: () => <h1>Flash is not supported</h1>,
  //  TfrmXLReport: () => <h1>XL Report</h1>,

  Default: def,
};

const withItemData =
  (ReportComponent) =>
  ({ ...props }) =>
    <ReportComponent {...props} />;

export const RenderData = ({ id, size }) => {
  const { items } = useSelector((state) => state.tabs);
  const item = items.find((i) => i.uid === id);

  return withItemData(views[item.data.docClass])({ data: item, size });
};
