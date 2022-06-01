import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const CategoryList = ({ data, customDeleteButton, customOrderSize, disableNavigation }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={1} onPress={!disableNavigation ? () => navigation.navigate('ProductDetailsScreen', data) : null}>
      <View style={styles.cardContainerWrapper}>
        <View style={styles.leftCard}>
          <Image
            source={{ uri: data.imageURL }}
            resizeMode='cover'
            style={styles.image}
          />
        </View>
        <View style={styles.rightCard}>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>{data.productName} {customOrderSize ? `[${customOrderSize}]` : null}</Text>
          <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.description}</Text>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 20 }}>P{data.price}</Text>
        </View>
      </View>
      {customDeleteButton}
    </TouchableOpacity>
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
})