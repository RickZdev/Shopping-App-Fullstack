import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Button, } from 'react-native'
import { CustomMainButton } from '../components/CustomButton'
import { CustomTextInput } from '../components/CustomInput'
import { Formik } from 'formik'
import { Picker } from "@react-native-picker/picker";
import { addProducts } from '../database/firebase-config';
import * as ImagePicker from 'expo-image-picker'
import CheckBox from 'expo-checkbox';
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const SettingsTab = () => {
  const [smallCheckbox, setSmallCheckbox] = useState(false)
  const [mediumCheckbox, setMediumCheckbox] = useState(false)
  const [largeCheckbox, setLargeCheckbox] = useState(false)
  const [imageUri, setImageUri] = useState('');

  const handlePressSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri)
    }
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.registerText}>ADD PRODUCTS </Text>
        <Formik
          initialValues={{ categories: '', popular: '', description: '', quantity: '', productName: '', price: '' }}
          onSubmit={(values, { resetForm }) => {
            let sizes = []
            !smallCheckbox || sizes.push('Small')
            !mediumCheckbox || sizes.push('Medium')
            !largeCheckbox || sizes.push('Large')

            addProducts(values, sizes, imageUri)
            resetForm();
            setSmallCheckbox(false)
            setMediumCheckbox(false)
            setLargeCheckbox(false)
            setImageUri('')
          }}
        >
          {(formikProps) => (
            <View style={styles.formContainer}>
              <Picker selectedValue={formikProps.values.categories} onValueChange={formikProps.handleChange('categories')} mode="dropdown" >
                <Picker.Item label="Categories" value="Unknown" />
                <Picker.Item label="Sweater" value="sweater" />
                <Picker.Item label="Top" value="top" />
                <Picker.Item label="Accessories" value="accessories" />
                <Picker.Item label="Underwear" value="underwear" />
                <Picker.Item label="Pants" value="pants" />
                <Picker.Item label="Shoes" value="shoes" />
              </Picker>
              <Picker selectedValue={formikProps.values.popular} onValueChange={formikProps.handleChange('popular')} mode="dropdown" >
                <Picker.Item label="Popular" value="Unknown" />
                <Picker.Item label="Best sellers" value="Best sellers" />
                <Picker.Item label="New arrivals" value="New arrivals" />
              </Picker>
              <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                <Text style={{ fontFamily: FONTS.DMSansRegular, fontSize: 16 }}> Sizes: </Text>
                <CheckBox value={smallCheckbox} onValueChange={(newValue) => setSmallCheckbox(newValue)} />
                <Text> Small </Text>
                <CheckBox value={mediumCheckbox} onValueChange={(newValue) => setMediumCheckbox(newValue)} />
                <Text> Medium </Text>
                <CheckBox value={largeCheckbox} onValueChange={(newValue) => setLargeCheckbox(newValue)} />
                <Text> Large </Text>
              </View>
              <Button title='Upload Photo' color="orange" onPress={handlePressSelectPhoto} />
              {
                imageUri !== '' ?
                  <View style={styles.photoContainer}>
                    <Image
                      source={{ uri: imageUri }}
                      resizeMode='contain'
                      style={styles.photo}
                    />
                  </View> :

                  <View style={styles.photoContainer}>
                    <Text> Upload Photo of Product </Text>
                  </View>
              }

              <CustomTextInput label={"PRODUCT NAME"} onchangeValue={formikProps.handleChange('productName')} keyboardType={'default'} value={formikProps.values.productName} customStyle={[styles.customInputStyle]} />
              <CustomTextInput label={"PRICE"} onchangeValue={formikProps.handleChange('price')} keyboardType={'phone-pad'} value={formikProps.values.price} customStyle={styles.customInputStyle} />
              <CustomTextInput label={"DESCRIPTION"} onchangeValue={formikProps.handleChange('description')} keyboardType={'email-address'} value={formikProps.values.description} customStyle={styles.customInputStyle} />
              <CustomTextInput label={"QUANTITY"} onchangeValue={formikProps.handleChange('quantity')} keyboardType={'phone-pad'} value={formikProps.values.quantity} customStyle={styles.customInputStyle} />
              <CustomMainButton text={"Add Products"} handlePress={formikProps.handleSubmit} customStyle={styles.customButtonStyle} />
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
    marginBottom: 20,
  },
  formContainer: {
    marginHorizontal: 47,
    paddingBottom: 20,
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
  },
  photoContainer: {
    marginVertical: 20,
    borderRadius: 10,
    width: 200,
    height: 150,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 30,
  },
  photo: {
    width: 200,
    height: 150,
  }
})