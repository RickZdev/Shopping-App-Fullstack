import React, { useCallback, useMemo } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { addToCart } from '../database/firebase-config';
import { CustomMainButton } from './CustomButton';
import COLORS from '../global/COLORS';

const CustomBottomSheet = ({ bottomSheetRef, isOpenBottomSheet, setQuantity, quantity, product, size }) => {
  const snapPoints = useMemo(() => ['35%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('HandleSheetChanges: Do Something', index);
  }, [])

  const handleAddQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleRemoveQuantity = () => {
    setQuantity(prev => prev - 1)
  }

  const handleAddToCart = () => {
    if (product.quantity < quantity) {
      Alert.alert('', 'Your order exceeds the quantity limit. Please try again.', [{ text: "Got it", onPress: () => { } }]);
    } else if (!size) {
      isOpenBottomSheet(false)
      Alert.alert('', 'Pick your choosen size.', [{ text: "Got it", onPress: () => { } }]);
    } else if (quantity <= 0) {
      Alert.alert('', 'You should add a quantity! Please try again.', [{ text: "Got it", onPress: () => { } }]);
    } else {
      addToCart(product, quantity, size)
      isOpenBottomSheet(false)
      ToastAndroid.show(`${product.productName} added to cart successfully!`, ToastAndroid.SHORT);
    }
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      onClose={() => isOpenBottomSheet(false)}
      animateOnMount={true}
      style={styles.container}
    >
      <BottomSheetView style={styles.bottomSheetViewContainer}>
        <View style={styles.bottomSheetViewContainerWrapper}>
          <TouchableOpacity style={styles.quantityButton} onPress={handleRemoveQuantity}>
            <Text style={styles.quantityButtonText}> - </Text>
          </TouchableOpacity>
          <View style={styles.orderQuantity}>
            <Text style={styles.orderQuantityText}> {quantity} </Text>
          </View>
          <TouchableOpacity style={styles.quantityButton} onPress={handleAddQuantity}>
            <Text style={styles.quantityButtonText}> + </Text>
          </TouchableOpacity>
        </View>
        <CustomMainButton text={'Add To Cart'} handlePress={handleAddToCart} customStyle={{ marginBottom: 10 }} />
      </BottomSheetView>
    </BottomSheet>
  )
}

export default CustomBottomSheet

const styles = StyleSheet.create({
  container: {
    shadowColor: '',
    elevation: 15,
    borderRadius: 25,
  },
  bottomSheetViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetViewContainerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    height: 50,
    width: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10,
  },
  quantityButtonText: {
    color: COLORS.white
  },
  orderQuantity: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderQuantityText: {
    color: COLORS.black
  },
})