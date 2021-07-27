import React from 'react'
import InputText from './InputText'
import DefaultControl from './DefaultControl'
import InputDateControl from './InputDateControl'
import InputListControl from './InputListControl'
import RadioButtonControl from './RadioButtonControl'
import SelectControl from './SelectControl'

/********************
 * Edit
 * Date
 * Combo
 * LookupCombo (tab NCI)
 * Memo
 * DateTime
 * SpinEdit
 * RadioGroup
 * ImageIndex
 * Boolean
 * RadioButton
 * MultiEdit
 * Group
 */

const controls = {
  '0.0': InputText,
  '1.0': InputDateControl, ///<h6>inputDate {data}</h6>,
  '2.0': SelectControl,
  '3.0': SelectControl, ///<h6>select {data}</h6>,
  '5.0': InputDateControl,
  //'6.0': spinEdit year now()
  '7.0': RadioButtonControl, ///<h6>radioButton {data}</h6>,
  '13.0': InputListControl, ///<h6>inputList {data}</h6>,
}

const withItemData =
  (ItemComponent) =>
  ({ ...props }) =>
    <ItemComponent {...props} />

export const RenderData = ({ control }) => {
  const ctrl = controls[control['CONTROL_TYPE']]
  if (ctrl) {
    return withItemData(ctrl)({ data: control })
  }
  return withItemData(DefaultControl)({ data: control })
}
