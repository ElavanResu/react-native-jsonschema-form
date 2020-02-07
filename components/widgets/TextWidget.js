import React from "react";
import PropTypes from "prop-types"
import { TextInput } from 'react-native-paper'

function TextWidget(props) {
  const { BaseInput } = props.registry.widgets;
  console.log('props of TextWidget: ', props)
  return (
    <TextInput
      error={showError}
      mode='outlined'
      readOnly={readonly}
      disabled={disabled}
      keyboardType={inputType === 'number' ? 'phone-pad' : ''}
      autoFocus={autofocus}
      value={(value === null || isNotDefined(value)) ? '' : `${value}`}
      // {...inputProps}
      // onChangeText={_onChange}
      // onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      // onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    />
  )
}

export default TextWidget;
