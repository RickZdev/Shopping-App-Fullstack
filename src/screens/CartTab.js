import { StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import { getCart } from '../database/firebase-config';
import CategoryList from '../components/CategoryList';
import FONTS from '../global/FONTS';
import { CustomDeleteButton } from '../components/CustomButton';
import CartBottomSheet from '../components/CartBottomSheet';

const CartTab = () => {
  const [cartDb, setCartDb] = useState([]);
  const [total, setTotal] = useState(0)
  const [isLoad, setLoad] = useState(false)

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
        ListEmptyComponent={() => !isLoad ? <Text style={styles.noCartText}> There is nothing in your cart. </Text> : null}
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
  noCartText: {
    marginHorizontal: 21,
    fontSize: 16,
    fontFamily: FONTS.DMSansBold
  },
  categoryListContainer: {
    marginTop: 10,
    marginBottom: -5,
  },
})