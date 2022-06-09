import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../global/COLORS'
import { CustomTextInput } from '../components/CustomInput'
import { CustomMainButton } from '../components/CustomButton'
import { resetPassword } from '../database/firebase-config'
import { Feather } from '@expo/vector-icons'
import FONTS from '../global/FONTS'

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    resetPassword(email)
    setEmail('')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <View style={styles.containerWrapper}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/officialLogo.png')}
            resizeMode='contain'
            style={styles.image}
          />
          <Text style={styles.title}>Forgot Password </Text>
        </View>
        <View style={styles.form}>
          <CustomTextInput label={'Email Address'} onchangeValue={(text) => setEmail(text)} value={email} keyboardType={'email-address'} customStyle={styles.customInput} />
          <CustomMainButton text={'Reset Password'} handlePress={handleResetPassword} />
        </View>
        <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  containerWrapper: {
    flex: 1,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  title: {
    textAlign: 'center',
    marginTop: 25,
    fontFamily: FONTS.DMSansBold,
    fontSize: 12,
    color: '#7E7E7E',
    letterSpacing: 1,
    marginBottom: 31,
  },
  form: {
    marginTop: 20,
  },
  closeIcon: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  customInput: {
    marginBottom: 15,
  }
})