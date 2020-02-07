import React from "react";
import { Text, View } from 'react-native'
import PropTypes from "prop-types";

function PasswordWidget(props) {
  const { BaseInput } = props.registry.widgets;
  return <>
  <View><Text>Test</Text></View>
    <BaseInput type="password" {...props} />
  </>
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default PasswordWidget;
