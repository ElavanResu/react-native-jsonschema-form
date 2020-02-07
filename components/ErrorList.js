import React from 'react';
import { View, Text } from 'react-native'

function findKeyValue (obj, stringPath) {
  const modifiedString = stringPath.split('.').splice(1)
  return modifiedString.reduce((o, i, index) => {
    if (modifiedString.length - 1 === index) {
      return o[i]
    } else {
      return o[i].properties
    }
  }, obj)
}

export default function ErrorList (props) {
  const { errors, schema } = props
  return (
    <View style={{ flexDirection: 'column' }} >
      <Text>Errors</Text>
      {
        errors.map((error, i) => {
          const key = findKeyValue(schema.properties, error.property).title
          return (
            <Text key={i} style={{ color: '#B00020' }}>
              {`${key} ${error.message}`}
            </Text>
          )
        })
      }
    </View>
  )
}
