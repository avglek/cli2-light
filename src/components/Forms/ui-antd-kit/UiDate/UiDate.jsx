import React from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { UiFormItem } from '../UiFormItem';

const StyledUiDate = styled(DatePicker)(
  ({ maxWidth }) => `
  width: 150px;
  max-width: ${
    maxWidth
      ? typeof maxWidth === 'string'
        ? maxWidth
        : `${maxWidth}px`
      : '120px'
  };
  border-color: #afc7da;
  box-shadow: none !important;

  &:hover {
    border-color: #afc7da;
  }

  &:not(.ant-picker-focused) {
    box-shadow: none !important;
    border-color: #e9e9e9;
  }
  
  .custom-dropdown {
    z-index: 1500;
  }
  `
);

const UiDate = ({ data, control, ...props }) => {
  // const _value = defaultValue
  //   ? moment.isMoment(defaultValue)
  //     ? defaultValue
  //     : moment(defaultValue)
  //   : void 0;

  return control ? (
    <Controller
      name={data.name}
      // defaultValue={_value || void 0}
      control={control}
      render={({ ref, field, fieldState: { error } }) => (
        <UiFormItem
          label={data['DISPLAY_LABEL']}
          validateStatus={error ? 'error' : ''}
          status={error ? 'error' : ''}
          help={error?.message}
        >
          <StyledUiDate
            maxWidth={'240px'}
            ref={ref}
            dropdownClassName={'custom-dropdown'}
            popupStyle={{ zIndex: '1500' }}
            size={'large'}
            {...field}
            value={
              field.value
                ? moment(field.value).isValid()
                  ? moment(field.value)
                  : 0
                : 0
            }
            format="DD.MM.YYYY"
            locale={locale}
            // disabled={disabled}
          />
        </UiFormItem>
      )}
    />
  ) : (
    <StyledUiDate
      size={'large'}
      format="DD.MM.YYYY"
      //defaultValue={_value}
      locale={locale}
      //disabled={disabled}
    />
  );
};

export default UiDate;
