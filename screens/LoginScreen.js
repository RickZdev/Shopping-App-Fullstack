import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Button, TouchableOpacity, ScrollView, KeyboardAvoidingAwareScroll } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { CustomPasswordInput, CustomTextInput } from '../components/CustomInput'
import { CustomMainButton, CustomTextButton } from '../components/CustomButton'
import { loginUser } from '../database/firebase-config'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView behavior='padding' style={styles.container}>
      <StatusBar />
      <SafeAreaView style={styles.logoWrapper}>
        <Image
          source={require("../assets/images/officialLogo.png")}
          resizeMode='contain'
          style={styles.logo}
        />
      </SafeAreaView>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          loginUser(values.email, values.password, navigation)
        }}>
        {(formikProps) => (
          <View style={styles.formContainer}>
            <CustomTextInput label={"EMAIL"} onchangeValue={formikProps.handleChange('email')} value={formikProps.values.email} />
            <CustomPasswordInput label={"PASSWORD"} onchangeValue={formikProps.handleChange('password')} value={formikProps.values.password} />
            <CustomMainButton text={"Login"} handlePress={formikProps.handleSubmit} />
            <CustomTextButton text={'Forgot Password'} customStyle={styles.formForgotPass} customTextStyle={styles.formForgotPassText} />
            <CustomTextButton text={"Don't have an account yet? Register"} handlePress={() => navigation.navigate('SignUpScreen')} />
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
    zIndex: -1,
    backgroundColor: COLORS.white,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 177,
  },
  formContainer: {
    marginTop: 137,
    marginHorizontal: 47,
  },
  formForgotPass: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  formForgotPassText: {
    fontSize: 10,
    fontFamily: FONTS.DMSansRegular,
    color: '#7E7E7E',
    letterSpacing: 1,
  },
  formRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  formRegisterText: {
    fontSize: 12,
    fontFamily: FONTS.DMSansRegular,
    color: COLORS.black,
    letterSpacing: 1,
  },
})