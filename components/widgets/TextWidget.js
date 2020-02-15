import React from "react";
import { TextInput } from 'react-native-paper'
import { StyleSheet } from "react-native"

function TextWidget(props) {
  const {
    value,
    readonly,
    disabled,
    autofocus,
    onBlur,
    onFocus,
    options,
    schema,
    formContext,
    registry,
    rawErrors,
    ...inputProps
  } = props
  let showError
  if (rawErrors && rawErrors.length > 0) {
    showError = true
  } else {
    showError = false
  }
  const inputType = options.inputType || 'text'

  const _onChange = (value) => {
    if (inputType === 'number') {
      return props.onChange(value === '' ? options.emptyValue : parseInt(value))
    } else {
      return props.onChange(value === '' ? options.emptyValue : value)
    }
  }   
  return (
    <TextInput
      theme={{
        colors: formContext.colorTheme
      }}
      style={styles.textInput}
      label='Email'
      error={showError}
      mode='outlined'
      readOnly={readonly}
      disabled={disabled}
      keyboardType={inputType === 'number' ? 'phone-pad' : null}
      autoFocus={autofocus}
      value={(value === null || value === undefined) ? '' : `${value}`}
      {...inputProps}
      onChangeText={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
      onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 16,
    backgroundColor: '#FFFFFF'
  }
})

export default TextWidget
