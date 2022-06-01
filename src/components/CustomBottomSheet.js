import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import COLORS from '../global/COLORS';
import { addToCart } from '../database/firebase-config';
import { CustomMainButton } from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const CustomBottomSheet = ({ bottomSheetRef, isOpenBottomSheet, setQuantity, quantity, product, size }) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ['35%'], []);
  const handleSheetChanges = useCallback((index) => {
    console.log('HandleSheetChanges', index);
  }, [])

  const handleAddQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const handleRemoveQuantity = () => {
    setQuantity(prev => prev - 1)
  }

  const handleAddToCart = () => {
    if (!size) {
      isOpenBottomSheet(false)
      Alert.alert('', 'Pick your choosen size.', [{ text: "Got it", onPress: () => { } }]);
    } else if (quantity > 0) {
      addToCart(product, quantity, size)
      isOpenBottomSheet(false)
      navigation.jumpTo('CartTab');
    } else {
      Alert.alert('', 'You should add a quantity! Please try again.', [{ text: "Got it", onPress: () => { } }]);
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