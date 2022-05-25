import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const CategoryList = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9} onPress={() => navigation.navigate('ProductDetailsScreen', data)}>
      <View style={styles.cardContainerWrapper}>
        <View style={styles.leftCard}>
          <Image
            source={{ uri: data.imageURL }}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={styles.rightCard}>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold }}>{data.productName}</Text>
          <Text style={{ fontSize: 10, fontFamily: FONTS.DMSansRegular, marginTop: 5 }}>{data.description}</Text>
          <Text style={{ fontSize: 14, fontFamily: FONTS.DMSansBold, marginTop: 20 }}>R{data.price}</Text>
        </View>
      </View>
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
    overflow: 'hidden',
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
    width: 115,
    height: 115,
  },
  rightCard: {
    marginLeft: 15
  },
})