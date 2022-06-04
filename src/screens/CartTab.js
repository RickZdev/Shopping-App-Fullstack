import { StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import COLORS from '../global/COLORS'
import { getCart } from '../database/firebase-config';
import CategoryList from '../components/CategoryList';
import FONTS from '../global/FONTS';
import { CustomDeleteButton } from '../components/CustomButton';
import CartBottomSheet from '../components/CartBottomSheet';
import { useScrollToTop } from '@react-navigation/native';
import LottieView from 'lottie-react-native'

const CartTab = () => {
  const [cartDb, setCartDb] = useState([]);
  const [total, setTotal] = useState(0)
  const [isLoad, setLoad] = useState(false)
  const ref = useRef(null);

  useScrollToTop(ref);
  useEffect(() => {
    getCart(setCartDb, setTotal);
    setLoad(true);
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Your cart </Text>
        {cartDb.length > 0 ? null : <View style={styles.horizontalLine} />}
      </View>
      <VirtualizedList
        ref={ref}
        data={cartDb}
        keyExtractor={(item => item.cartId)}
        renderItem={({ item }) => (
          <View style={styles.categoryListContainer}>
            <CategoryList
              data={item}
              customDeleteButton={<CustomDeleteButton itemToDelete={item} />}
              disableNavigation={true}
            />
          </View>
        )}
        getItemCount={cartDb => cartDb.length}
        getItem={(cartDb, index) => cartDb[index]}
        ListEmptyComponent={() => (
          <View style={styles.noCartContainer}>
            <LottieView
              source={require('../../assets/animation/cart.json')}
              style={styles.noCartAnimation}
              autoPlay={true}
              loop={true}
            />
            <Text style={styles.noCartText}> There is nothing in your cart. </Text>
          </View>
        )}
      />
      <CartBottomSheet cartDb={cartDb} total={total} />
    </View >
  )
}

export default CartTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    marginTop: 38,
    marginBottom: 10,
    marginHorizontal: 21,
  },
  headerText: {
    fontSize: 25,
    fontFamily: FONTS.DMSansBold,
  },
  horizontalLine: {
    marginTop: 15,
    borderWidth: 0.8,
    borderColor: COLORS.gray
  },
  categoryListContainer: {
    marginTop: 10,
    marginBottom: -5,
  },
  noCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCartAnimation: {
    width: 300,
    height: 300,
    marginTop: 40,
    alignSelf: 'center'
  },
  noCartText: {
    marginTop: 25,
    marginHorizontal: 21,
    fontSize: 16,
    fontFamily: FONTS.DMSansBold
  },
})