import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomBackButton } from '../components/CustomButton'
import FONTS from '../global/FONTS'

const CheckoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomBackButton />
      </View>
      <Text style={styles.title}>Select payment method</Text>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 21,
  },
  header: {
    marginTop: 20,
  },
  title: {
    marginTop: 43,
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
  }
})