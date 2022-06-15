import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CustomMainButton } from './CustomButton'
import { addToOrderHistory, deleteOrderReceived } from '../database/firebase-config'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const CategoryList = ({ data, customDeleteButton, disableNavigation, isOrderScreen, isOrderHistoryScreen }) => {
  const navigation = useNavigation();

  const handleOrderReceived = () => {
    addToOrderHistory(data);
    deleteOrderReceived(data);
  }

  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={1} onPress={!disableNavigation ? () => navigation.navigate('ProductDetailsScreen', data) : null}>
      <View style={styles.cardContainerWrapper}>
        <View style={styles.leftCard}>
          <Image
            source={{ uri: data.imageURL }}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.rightCard}>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>{data.productName} {data.orderSize ? `[${data.orderSize}]` : null}</Text>
          <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.description}</Text>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 20 }}>P{data.price}</Text>
        </View>
      </View>
      {isOrderScreen ?
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginTop: 12 }}>
          <View style={{ paddingRight: 20, width: 140 }}>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>Delivery Address: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.deliveryAddress}</Text>
            <CustomMainButton text={'Order Received'} customStyle={styles.customButton} customText={styles.customText} handlePress={handleOrderReceived} />

          </View>
          <View style={{ paddingRight: 20, width: 140 }}>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>Delivery Date: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>Sun Jun 25 2022</Text>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 5, }}>Order Date: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5, }}>{data.orderDate}</Text>
          </View>
        </View> : null
      }
      {isOrderHistoryScreen ?
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginTop: 12, paddingBottom: 15 }}>
          <View style={{ paddingRight: 20, width: 140 }}>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>Delivery Address: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.deliveryAddress}</Text>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 5, }}>Status: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5, }}>Order Received</Text>
          </View>
          <View style={{ paddingRight: 20, width: 140 }}>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>Received Date: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.receivedBy}</Text>
            <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 5, }}>Order Date: </Text>
            <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5, }}>{data.orderDate}</Text>
          </View>
        </View> : null
      }
      {customDeleteButton}
    </TouchableOpacity >
  )
}

export default CategoryList

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
  },
  cardContainerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 145
  },
  leftCard: {
    width: 123,
    height: 123,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightCard: {
    marginLeft: 15
  },
  customButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'black'
  },
  customText: {
    fontSize: 10
  }
})