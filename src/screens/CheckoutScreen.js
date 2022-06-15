import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { CustomBackButton } from '../components/CustomButton'
import { getOrders } from '../database/firebase-config'
import { CustomVisaPayment } from '../components/CustomPaymentForm'
import FONTS from '../global/FONTS'
import COLORS from '../global/COLORS'

const CheckoutScreen = ({ navigation, route }) => {
  const { total, cartDb } = route.params;
  const [orderDb, setOrderDb] = useState([])
  const scrollRef = useRef();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    let isMount = true;
    getOrders({ setOrderDb })

    return () => {
      isMount = false;
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomBackButton />
      </View>
      <Text style={styles.title}>Select payment methods</Text>
      <View style={styles.logoWrapper}>
        <TouchableOpacity onPress={() => scrollRef.current.scrollTo({ x: 0 })}>
          <Image
            source={require('../../assets/images/visa.png')}
            resizeMode='contain'
            style={styles.paymentLogo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => scrollRef.current.scrollTo({ x: width })}>
          <Image
            source={require('../../assets/images/paypal.png')}
            resizeMode='contain'
            style={styles.paymentLogo}
          />
        </TouchableOpacity >
        <TouchableOpacity onPress={() => scrollRef.current.scrollTo({ x: width * 2 })}>
          <Image
            source={require('../../assets/images/applepay.png')}
            resizeMode='contain'
            style={styles.paymentLogo}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.containerWrapper}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}>
        <CustomVisaPayment total={total} cartDb={cartDb} orderDb={orderDb} navigation={navigation} title={'Visa'} />
        <CustomVisaPayment total={total} cartDb={cartDb} orderDb={orderDb} navigation={navigation} title={'Paypal'} />
        <CustomVisaPayment total={total} cartDb={cartDb} orderDb={orderDb} navigation={navigation} title={'Apple Pay'} />
      </ScrollView>
    </View >

  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginTop: 20,
    paddingLeft: 21,
  },
  title: {
    paddingLeft: 21,
    marginTop: 43,
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
  },
  logoContainer: {
    paddingLeft: 21,
    marginBottom: -100
  },
  logoWrapper: {
    paddingLeft: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: -8,
    marginRight: 12,
  },
  paymentLogo: {
    width: 112,
  },
})