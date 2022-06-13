import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'
import { CustomMainButton } from './CustomButton'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const CartBottomSheet = ({ cartDb, total }) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ['45%'], []);
  const bottomSheetRef = useRef(null);

  const handleOpenBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, [])

  return (
    <>
      <TouchableOpacity style={styles.cartButtonContainer} onPress={() => handleOpenBottomSheet(0)}>
        <LottieView
          source={require('../../assets/animation/cartIcon.json')}
          style={styles.cartAnimation}
          autoPlay={true}
          loop={true}
        />
      </TouchableOpacity>
      {isOpen && cartDb.length > 0 ?
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
          animateOnMount={true}
          style={styles.bottomSheetContainer}
        >
          <BottomSheetView style={styles.bottomSheetViewContainer}>
            <ScrollView contentContainerStyle={{ flex: cartDb.length > 7 ? 0 : 1, justifyContent: 'flex-end' }} showsVerticalScrollIndicator={false}>
              {cartDb.map((item, key) => (
                <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.checkoutText}> {item.orderQuantity} x {item.productName} [{item.orderSize}] </Text>
                  <Text style={styles.checkoutText}> {item.totalPrice} </Text>
                </View>
              ))}
              <View style={styles.horizontalLine} />
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}> Total: </Text>
                <Text style={styles.totalText}> {total}</Text>
              </View>
              <CustomMainButton text={'Checkout'} handlePress={() => navigation.navigate('CheckoutScreen', { total, cartDb })} />
            </ScrollView>
          </BottomSheetView>
        </BottomSheet>
        : null}
    </>
  )
}

export default CartBottomSheet

const styles = StyleSheet.create({
  cartButtonContainer: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30, right: 30,
  },
  bottomSheetContainer: {
    shadowColor: '',
    elevation: 15,
    borderRadius: 25,
  },
  bottomSheetViewContainer: {
    flex: 1,
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 15,
    borderColor: 'gray',
    elevation: 7,
    backgroundColor: 'white'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 14,
    fontFamily: FONTS.DMSansBold
  },
  checkoutText: {
    fontSize: 14,
    fontFamily: FONTS.DMSansBold
  },
  horizontalLine: {
    marginTop: 15,
    borderWidth: 0.8,
    borderColor: COLORS.gray
  },
  cartAnimation: {
    width: 30,
    height: 30,
  }
})