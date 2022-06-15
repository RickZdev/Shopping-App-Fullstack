import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { CustomBackButton, CustomMenuDrawerButton } from '../components/CustomButton'
import { getOrders } from '../database/firebase-config';
import CategoryList from '../components/CategoryList'
import COLORS from '../global/COLORS';
import FONTS from '../global/FONTS';

const OrdersDrawer = () => {
  const [orderDb, setOrderDb] = useState([]);

  useEffect(() => {
    let isMount = true;
    getOrders({ setOrderDb });

    return () => {
      isMount = false;
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <CustomBackButton />
          <Text style={styles.headerText}>Back to Home</Text>
        </View>
        <View style={styles.headerRight}>
          <CustomMenuDrawerButton />
        </View>
      </View>
      <FlatList
        data={orderDb}
        keyExtractor={(item) => item.cartId}
        renderItem={({ item }) => (
          <View style={styles.listWrapper}>
            <CategoryList data={item}
              isOrderScreen={true}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ paddingHorizontal: 15, paddingTop: 15, }}>
            <Text style={{ fontFamily: FONTS.DMSansBold, fontSize: 18, }}> Nothing to track. </Text>
          </View>
        )}
      />
    </View>
  )
}

export default OrdersDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    elevation: 5,
    position: 'relative',
    zIndex: 100,
    paddingLeft: 20,
    paddingRight: 32,
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    paddingLeft: 10,
    fontFamily: FONTS.DMSansBold,
    fontSize: 15
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end'
  },
  listWrapper: {
    paddingTop: 10,
  }
})