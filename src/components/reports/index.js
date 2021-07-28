import React from 'react'
import { useSelector } from 'react-redux'
import DataGridReport from './DataGridReport'
import TwoDataGrid from './TwoDataGrid'
import DataPlainText from './DataPlainText'

const def = <h1>Default</h1>

const views = {
  TfrmTable: DataGridReport,
  TfrmTwoTables: TwoDataGrid,
  TfrmText: DataPlainText,
  TfrmFlash: <h1>Flash is not supported</h1>,
  TfrmXLReport: <h1>XL Report</h1>,

  Default: def,
}

const withItemData =
  (ReportComponent) =>
  ({ ...props }) =>
    <ReportComponent {...props} />

export const RenderData = ({ id }) => {
  const { items } = useSelector((state) => state.tabs)
  const item = items.find((i) => i.uid === id)

  return withItemData(views[item.data.docClass])({ data: item })
}
