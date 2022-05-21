import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import { Formik } from 'formik'
import { CustomPasswordInput, CustomTextInput } from '../components/CustomInput'
import { CustomMainButton, CustomTextButton } from '../components/CustomButton'
import { Feather } from '@expo/vector-icons'
import { Picker } from "@react-native-picker/picker";
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const SettingsTab = () => {
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.registerText}>REGISTER</Text>
        <Formik
          initialValues={{ fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '', categories: '', popular: '', sizes: '' }}
          onSubmit={(values) => {
            console.log(values.country)
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Picker
                selectedValue={formikProps.values.country}
                onValueChange={formikProps.handleChange('country')}
                mode="dropdown" // Android only
              >
                <Picker.Item label="Categories" value="Unknown" />
                <Picker.Item label="Sweater" value="sweater" />
                <Picker.Item label="Top" value="top" />
                <Picker.Item label="Accessories" value="accessories" />
                <Picker.Item label="Underwear" value="underwear" />
                <Picker.Item label="Pants" value="pants" />
                <Picker.Item label="Shoes" value="shoes" />
              </Picker>
              <Picker
                selectedValue={formikProps.values.popular}
                onValueChange={formikProps.handleChange('popular')}
                mode="dropdown" // Android only
              >
                <Picker.Item label="Popular" value="Unknown" />
                <Picker.Item label="Best sellers" value="Best sellers" />
                <Picker.Item label="New arrivals" value="New arrivals" />
                <Picker.Item label="Accessories" value="accessories" />
              </Picker>
              <CheckBox value={true} />
              <CustomTextInput label={"PRODUCT NAME"} onchangeValue={formikProps.handleChange('fullName')} keyboardType={'default'} value={formikProps.values.fullName} customStyle={styles.customInputStyle} />
              <CustomTextInput label={"PRICE"} onchangeValue={formikProps.handleChange('email')} keyboardType={'email-address'} value={formikProps.values.email} customStyle={styles.customInputStyle} />


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

export default SettingsTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
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