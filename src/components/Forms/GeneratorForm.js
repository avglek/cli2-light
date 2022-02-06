import React from 'react';

import DefaultControl from './DefaultControl';

import {
  UiDate,
  UiInput,
  UiRadioGroup,
  UiSelect,
  UiTextarea,
  UiNumber,
  UiRadioMixedGroup,
} from './ui-antd-kit';

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
  '0.0': UiInput,
  '1.0': UiDate, ///<h6>inputDate {data}</h6>,
  //'2.0': UISimpleSelect,
  '3.0': UiSelect, ///<h6>select {data}</h6>,
  //'5.0': InputDateControl,
  '6.0': UiNumber,

  '7.0': UiRadioGroup, ///<h6>radioButton {data}</h6>,
  '10.0': UiRadioMixedGroup,
  //'11.0': UiRadioButton,
  '13.0': UiTextarea, ///<h6>inputList {data}</h6>,
};

const withItemData =
  (ItemComponent) =>
  ({ ...props }) =>
    <ItemComponent {...props} />;

export const RenderForm = ({ ui, control, look, controlsValue }) => {
  const ctrl = controls[ui['CONTROL_TYPE']];

  if (ctrl) {
    return withItemData(ctrl)({ data: ui, control, look, controlsValue });
  }
  return withItemData(DefaultControl)({ data: ui, controlsValue });
};
