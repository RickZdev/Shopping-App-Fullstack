import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'
import { useNavigation } from '@react-navigation/native'
import SHADOWS from '../global/SHADOWS'
import { Octicons, Feather, AntDesign, Ionicons } from '@expo/vector-icons'

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

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.backWrapper} onPress={() => navigation.goBack()}>
      <Feather name='chevron-left' size={25} style={styles.back} />
    </TouchableOpacity >
  )
}

export { CustomMainButton, CustomTextButton, CustomBackButton }

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
  backWrapper: {
    backgroundColor: COLORS.white,
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.dark
  },
})