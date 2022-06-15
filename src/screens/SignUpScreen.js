import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { CustomPasswordInput, CustomTextInput } from '../components/CustomInput'
import { CustomMainButton, CustomTextButton } from '../components/CustomButton'
import { Feather } from '@expo/vector-icons'
import { Formik } from 'formik'
import { addAuthenticatedUser } from '../database/firebase-config'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const SignUpScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/officialLogo.png')}
          />
        </View>
        <Text style={styles.registerText}>REGISTER</Text>
        <Formik
          initialValues={{ fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
          onSubmit={(values, { resetForm }) => {
            if (values.password === values.confirmPassword) {
              addAuthenticatedUser(values, navigation)
              resetForm()
            } else {
              console.log('wrong password')
            }
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <CustomTextInput label={"FULL NAME"} onchangeValue={formikProps.handleChange('fullName')} keyboardType={'default'} value={formikProps.values.fullName} customStyle={styles.customInputStyle} />
              <CustomTextInput label={"EMAIL"} onchangeValue={formikProps.handleChange('email')} keyboardType={'email-address'} value={formikProps.values.email} customStyle={styles.customInputStyle} />
              <CustomTextInput label={"PHONE NUMBER"} onchangeValue={formikProps.handleChange('phoneNumber')} keyboardType={'phone-pad'} value={formikProps.values.phoneNumber} customStyle={styles.customInputStyle} />
              <CustomPasswordInput label={"PASSWORD"} onchangeValue={formikProps.handleChange('password')} value={formikProps.values.password} customStyle={styles.customInputStyle} />
              <CustomPasswordInput label={"CONFIRM PASSWORD"} onchangeValue={formikProps.handleChange('confirmPassword')} value={formikProps.values.confirmPassword} customStyle={styles.customInputStyle} />
              <CustomMainButton text={"Register"} handlePress={formikProps.handleSubmit} customStyle={styles.customButtonStyle} />
              <CustomTextButton text={"Registered already? Login"} handlePress={() => navigation.goBack()} customStyle={styles.customRegisterStyle} />
              <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.replace('LoginScreen')}>
                <Feather name="x" size={24} />
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 100,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 25,
    fontFamily: FONTS.DMSansBold,
    fontSize: 12,
    color: '#7E7E7E',
    letterSpacing: 1,
    marginBottom: 31,
  },
  formContainer: {
    marginTop: 20,
    marginHorizontal: 47,
    paddingBottom: 32
  },
  customInputStyle: {
    marginBottom: 20,
  },
  customButtonStyle: {
    marginTop: 10,
  },
  customRegisterStyle: {
    marginTop: 18
  },
  closeIcon: {
    alignSelf: 'center',
    marginTop: 30,
  }
})