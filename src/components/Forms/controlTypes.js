import React from 'react'
import InputText from './InputText'
import DefaultControl from './DefaultControl'
import InputDateControl from './InputDateControl'
import InputListControl from './InputListControl'
import RadioButtonControl from './RadioButtonControl'
import SelectControl from './SelectControl'
import SimpleSelect from './SimpleSelect'

/********************
 * 0.0 Edit
 * 1.0 Date
 * 2.0 Combo
 * 3.0 LookupCombo (tab NCI)
 * 4.0 Memo
 * 5.0 DateTime
 * 6.0 SpinEdit
 * 7.0 RadioGroup
 * 8.0 ImageIndex
 * 9.0 Boolean
 * 10.0 RadioButton
 * 13.0 MultiEdit
 * 11.0 Group
 */

const controls = {
  '0.0': InputText,
  '1.0': InputDateControl, ///<h6>inputDate {data}</h6>,
  '2.0': SimpleSelect,
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

export const RenderData = ({ control, controlsValue }) => {
  const ctrl = controls[control['CONTROL_TYPE']]
  if (ctrl) {
    return withItemData(ctrl)({ data: control, controlsValue })
  }
  return withItemData(DefaultControl)({ data: control, controlsValue })
}
