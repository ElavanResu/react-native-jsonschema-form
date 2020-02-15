import React from 'react'
// import RNPaperSelect from '../../../ReactNativePickerSelect'
// import RNPaperSelect from '../../../TestPicker'
import RNPaperSelect from 'react-native-paper-select'
import includes from 'lodash/includes'
import { StyleSheet } from 'react-native'
import { getStyle, asNumber } from '../../utils'

const nums = new Set(['number', 'integer'])

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue ({ type, items }, value) {
  if (value == null) {
    return undefined
  } else if (value === '') {
    return undefined
  } else if (type === 'array' && items && nums.has(items.type)) {
    return value.map(asNumber)
  } else if (type === 'boolean') {
    return value === 'true'
  } else if (type === 'number') {
    return asNumber(value)
  }
  return value
}

class SelectButtonWidget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pickerSelect: ''
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    let optionsFull = []
    this.props.options.enumOptions.forEach(element => {
      optionsFull.push(element.value)
    })
    if (this.props.value != null && !includes(optionsFull, this.props.value)) { this.props.onChange(processValue(this.props.schema, undefined)) }
  }

  render () {
    const {
      schema,
      id,
      options,
      value,
      required,
      disabled,
      readonly,
      multiple,
      autofocus,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      formContext,
      rawErrors,
      styleSheet
    } = this.props
    let showError
    if (rawErrors && rawErrors.length > 0) {
      showError = true
    } else {
      showError = false
    }
    const { enumOptions, enumDisabled } = options
    const emptyValue = multiple ? [] : placeholder || ''
    let optionsFull = []
    let label
    enumOptions.forEach(element => {
      optionsFull.push(element.label)
      if (element.value === value) { label = element.label }
    })
    return (
      <RNPaperSelect
        theme={{
          colors: formContext.colorTheme
        }}
        mode='outlined'
        showError={showError}
        label={schema.title}
        textInputValue={label}
        textInputStyle={styles.textInput}
        items={enumOptions}
        onValueChange={value => {
          onChange(value)
        }}
        pickerValue={value}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16
  },
  labelContainer: {
    height: 50
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginTop: 16
  }
})

export default SelectButtonWidget
