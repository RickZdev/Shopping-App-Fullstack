import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import { getCart } from '../database/firebase-config';
import CategoryList from '../components/CategoryList';
import FONTS from '../global/FONTS';
import { useNavigation } from '@react-navigation/native';
import { CustomMainButton } from '../components/CustomButton';

const CartTab = () => {
  const navigation = useNavigation();
  const [cartDb, setCartDb] = useState([]);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getCart(setCartDb, setTotal);
    console.log(total)
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
                <CategoryList data={item} />
              </View>
            )}
          /> :
          <Text style={styles.noCartText}> There is nothing in your cart. </Text>
      }
      {cartDb[0] ? <View style={styles.bottomContainer}>
        {cartDb.map((item, key) => (
          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <Text style={styles.checkoutText}> 1 x {item.productName} </Text>
            <Text style={styles.checkoutText}> R{item.price} </Text>
          </View>
        ))}
        <View style={styles.horizontalLine} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.totalText}> Total: </Text>
          <Text style={styles.totalText}> R{total}</Text>
        </View>
        <CustomMainButton text={"Checkout"} />
      </View> : null}
    </View>
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
    paddingTop: 10,
  },
  bottomContainer: {
    marginHorizontal: 21,
    marginBottom: 15,
    marginTop: 25,
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