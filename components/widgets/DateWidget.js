import React, { useState } from 'react'
import dayjs from 'dayjs'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { TextInput } from 'react-native-paper'

const DateWidget = (props) => {
  let inputRef

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false)

  const buildMinMaxDates = () => {
    const { options } = props
    const { min, max, type } = options
    const minDate = dayjs().subtract(min, type).format('YYYY/MM/DD')
    const maxDate = dayjs().add(max, type).format('YYYY/MM/DD')
    return { minDate, maxDate }
  }

  showDateTimePicker = () => {
    setIsDateTimePickerVisible(true)
  }

  hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false)
  }

  const handleDatePicked = date => {
    console.log('handleDatePicked called')
    // onChange(dayjs(date).format('YYYY-MM-DD'))
    inputRef.blur()
    hideDateTimePicker()
    onChange(dayjs(date).format('YYYY-MM-DD'))
  }

  const onChange = (value) => {
    console.log('onChange called')
    return props.onChange(value === '' ? undefined : value)
  }

  const {
    // id,
    value,
    // readonly,
    // disabled,
    // autofocus,
    // onBlur,
    // onFocus,
    // options,
    // schema,
    formContext,
    label,
    // onChange,
    // errorSchema,
    // classes,
    rawErrors,
    ...inputProps
  } = props

  let showError
  if (rawErrors && rawErrors.length > 0) {
    showError = true
  } else {
    showError = false
  }
  const { minDate, maxDate } = buildMinMaxDates()

  return (
    <TouchableOpacity onPress={showDateTimePicker} style={styles.touchableOpacity}>
      <View pointerEvents='none'>
        <TextInput
          theme={{
            colors: formContext.colorTheme
          }}
          style={styles.textInput}
          mode='outlined'
          error={showError}
          pointerEvents='none'
          ref={(ref) => {
            inputRef = ref
          }}
          readOnly
          value={value ? dayjs(value).format('DD/MM/YYYY') : ''}
          label={label}
          editable={false}
        />
        <DateTimePicker
          datePickerModeAndroid='spinner'
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
          minimumDate={new Date(minDate)}
          maximumDate={new Date(maxDate)}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  touchableOpacity: {
    marginTop: 16
  },
  textInput: {
    backgroundColor: '#FFFFFF'
  }
})

export default DateWidget
