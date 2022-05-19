import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'
import { useNavigation } from '@react-navigation/native'

const CustomMainButton = ({ text, handlePress, customStyle }) => {
  return (
    <>
      <TouchableOpacity style={[styles.buttonContainer, customStyle]} onPress={handlePress} activeOpacity={0.5}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}

const CustomTextButton = ({ text, handlePress, customStyle, customTextStyle }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity style={[styles.formRegister, customStyle]} onPress={handlePress}>
        <Text style={[styles.formRegisterText, customTextStyle]}>{text}</Text>
      </TouchableOpacity>
    </>
  )
}

export { CustomMainButton, CustomTextButton }

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: -6,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    paddingVertical: 13,
    color: COLORS.white,
    fontFamily: FONTS.DMSansBold,
    fontSize: 12,
    letterSpacing: 2
  },
  formRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  formRegisterText: {
    fontSize: 12,
    fontFamily: FONTS.DMSansBold,
    color: COLORS.black,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})