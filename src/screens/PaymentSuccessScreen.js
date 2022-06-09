import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const PaymentSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/checkout.json')}
        style={styles.cartAnimation}
        autoPlay={true}
        loop={false}
        onAnimationFinish={() => navigation.navigate('HomeTab')}
      />
      <Text style={styles.text}> Payment Succesful! </Text>
    </View>
  )
}

export default PaymentSuccessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  text: {
    fontFamily: FONTS.DMSansBold,
    fontSize: 21,
    marginBottom: 20,
  },
  cartAnimation: {
    width: 220,
    height: 220,
    marginBottom: 20,
  }
})