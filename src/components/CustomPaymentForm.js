import { Dimensions, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { addToOrder, deleteCurrentCart } from '../database/firebase-config'
import FONTS from '../global/FONTS'
import { CustomPasswordInput, CustomTextInput } from './CustomInput'
import { CustomMainButton } from './CustomButton'

const CustomVisaPayment = ({ total, cartDb, orderDb, navigation, title }) => {
  const [isSavedToCard, setIsSavedToCard] = useState(false);
  const [buttonText, setButtonText] = useState(`Pay ${total}`)
  const [showLoading, setShowLoading] = useState(false);

  const handleCheckOut = () => {
    setButtonText('Please Wait')
    setShowLoading(!showLoading);
    setTimeout(() => {
      navigation.navigate('PaymentSuccessScreen')
    }, 3000)
  }

  useEffect(() => {
    let isMount = true;
    setTimeout(() => {
      setShowLoading(false)
      setButtonText(`Pay ${total}`)
    }, 5000)

    return () => {
      isMount = false;
    }
  }, [showLoading])

  return (
    <ScrollView>
      <Formik
        initialValues={{ cardNumber: '', password: '', deliveryAddress: '', cvv: '', expiryDate: '' }}
        onSubmit={(values) => {
          !showLoading ?
            handleCheckOut() : null

          addToOrder({ ...values, isSavedToCard, total }, cartDb, orderDb)
          deleteCurrentCart();
        }}>
        {(formikProps) => (
          <View style={styles.formContainer}>
            <Text style={{ textAlign: 'center', fontFamily: FONTS.DMSansRegular, fontSize: 15, marginBottom: 15 }}>{title}</Text>
            <CustomPasswordInput label={"Card number"} onchangeValue={formikProps.handleChange('cardNumber')} value={formikProps.values.cardNumber} />
            <CustomPasswordInput label={"Password"} onchangeValue={formikProps.handleChange('password')} value={formikProps.values.password} />
            <CustomTextInput label={"Delivery address"} onchangeValue={formikProps.handleChange('deliveryAddress')} value={formikProps.values.deliveryAddress} />

            <View style={styles.formBottom}>
              <CustomPasswordInput label={"CVV"} onchangeValue={formikProps.handleChange('cvv')} value={formikProps.values.cvv} customStyle={styles.customInput1} />
              <CustomTextInput label={"Expiry date"} onchangeValue={formikProps.handleChange('expiryDate')} value={formikProps.values.expiryDate} customStyle={styles.customInput2} />
            </View>
            <View style={styles.formSaveCard}>
              <Text style={styles.formTextSave}> Save this card </Text>
              <Switch
                value={isSavedToCard}
                onValueChange={() => setIsSavedToCard(!isSavedToCard)}
              />
            </View>
            <CustomMainButton text={buttonText} handlePress={formikProps.handleSubmit} showLoading={showLoading} customStyle={styles.customButton} />
          </View>
        )}
      </Formik>
    </ScrollView>

  )
}

export { CustomVisaPayment }

const styles = StyleSheet.create({
  formContainer: {
    marginRight: 21,
    paddingBottom: 25,
    width: Dimensions.get('window').width - 20,
    paddingLeft: 20,
  },
  formBottom: {
    flexDirection: 'row',
  },
  formSaveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  formTextSave: {
    fontFamily: FONTS.DMSansBold,
    fontSize: 16
  },
  customInput1: {
    width: 170,
    marginRight: 10,
  },
  customInput2: {
    width: 140,
  },
  customButton: {
    marginTop: 20,
  }
})

{/* <Formik
          initialValues={{ cardNumber: '', password: '', deliveryAddress: '', cvv: '', expiryDate: '' }}
          onSubmit={(values) => {
            !showLoading ?
              handleCheckOut() : null

            addToOrder({ ...values, isSavedToCard, total }, cartDb, orderDb)
            deleteCurrentCart();
          }}>
          {(formikProps) => (
            <View style={styles.formContainer}>
              <CustomPasswordInput label={"Card number"} onchangeValue={formikProps.handleChange('cardNumber')} value={formikProps.values.cardNumber} />
              <CustomPasswordInput label={"Password"} onchangeValue={formikProps.handleChange('password')} value={formikProps.values.password} />
              <CustomTextInput label={"Delivery address"} onchangeValue={formikProps.handleChange('deliveryAddress')} value={formikProps.values.deliveryAddress} />

              <View style={styles.formBottom}>
                <CustomPasswordInput label={"CVV"} onchangeValue={formikProps.handleChange('cvv')} value={formikProps.values.cvv} customStyle={styles.customInput1} />
                <CustomTextInput label={"Expiry date"} onchangeValue={formikProps.handleChange('expiryDate')} value={formikProps.values.expiryDate} customStyle={styles.customInput2} />
              </View>
              <View style={styles.formSaveCard}>
                <Text style={styles.formTextSave}> Save this card </Text>
                <Switch
                  value={isSavedToCard}
                  onValueChange={() => setIsSavedToCard(!isSavedToCard)}
                />
              </View>
              <CustomMainButton text={buttonText} handlePress={formikProps.handleSubmit} showLoading={showLoading} customStyle={styles.customButton} />
            </View>
          )}
        </Formik> */}