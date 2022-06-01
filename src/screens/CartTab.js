import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import { getCart } from '../database/firebase-config';
import CategoryList from '../components/CategoryList';
import FONTS from '../global/FONTS';
import { CustomMainButton, CustomDeleteButton } from '../components/CustomButton';
import SHADOWS from '../global/SHADOWS';

const CartTab = () => {
  const [cartDb, setCartDb] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getCart(setCartDb, setTotal);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Your cart </Text>
        {cartDb[0] ? null : <View style={styles.horizontalLine} />}
      </View>
      {
        cartDb[0] ?
          <FlatList
            data={cartDb}
            keyExtractor={(item => item.cartId)}
            renderItem={({ item }) => (
              <View style={styles.categoryListContainer}>
                <CategoryList
                  data={item}
                  customDeleteButton={<CustomDeleteButton itemToDelete={item} />}
                  customOrderSize={item.orderSize}
                  disableNavigation={true}
                />
              </View>
            )}
          />
          :
          <Text style={styles.noCartText}> There is nothing in your cart. </Text>
      }
      {cartDb[0] ?
        <View style={styles.bottomContainer}>
          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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
            <CustomMainButton text={"Checkout"} />
          </ScrollView>
        </View>
        : null
      }
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
  noCartText: {
    marginHorizontal: 21,
    fontSize: 16,
    fontFamily: FONTS.DMSansBold
  },
  categoryListContainer: {
    marginTop: 10,
    marginBottom: -5,
  },
  bottomContainer: {
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 15,
    borderColor: 'gray',
    elevation: 7,
    backgroundColor: 'white'
  },
  scroll: {
    maxHeight: 220,
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
  }
})