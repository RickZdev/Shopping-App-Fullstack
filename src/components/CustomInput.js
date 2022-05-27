import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'
import { Feather } from '@expo/vector-icons'

const CustomTextInput = ({ label, onchangeValue, value, customStyle, keyboardType }) => {
  return (
    <>
      <View>
        <Text style={styles.label}> {label} </Text>
        <TextInput style={[styles.input, customStyle]} keyboardType={keyboardType} onChangeText={onchangeValue} value={value} />
      </View>
    </>
  )
}

const CustomPasswordInput = ({ label, onchangeValue, value, customStyle }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);

  const handlePressShowPass = () => {
    const newState = !isVisiblePassword;
    setIsVisiblePassword(newState)
  }
  return (
    <>
      <View>
        <Text style={styles.label}> {label} </Text>
        <TextInput style={[styles.input, customStyle]} onChangeText={onchangeValue} value={value} secureTextEntry={isVisiblePassword} />
        <TouchableOpacity style={styles.iconWrapper} onPress={() => handlePressShowPass()}>
          <Feather name='eye' size={18} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export { CustomTextInput, CustomPasswordInput }

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: -7,
    left: 19,
    backgroundColor: COLORS.white,
    zIndex: 1000,
    color: '#7E7E7E',
    fontFamily: FONTS.DMSansBold,
    fontSize: 10,
    letterSpacing: 2,
  },
  input: {
    position: 'relative',
    zIndex: -1000,
    height: 40,
    marginBottom: 30,
    paddingLeft: 23,
    paddingRight: 45,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    color: COLORS.black,
    fontFamily: FONTS.DMSansBold,
    fontSize: 14,
  },
  iconWrapper: {
    position: 'absolute',
    right: 20,
    top: 10,
    bottom: 0,
  },
})