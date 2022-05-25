import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'
import MenuDrawer from '../components/MenuDrawer'
import FONTS from '../global/FONTS'
import SizeButton from '../components/SizeButton'
import { CustomBackButton } from '../components/CustomButton'
import { Octicons, Feather, AntDesign, Ionicons } from '@expo/vector-icons'

const ProductDetailsScreen = ({ route }) => {
  const product = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <CustomBackButton />
        </View>
        <View style={styles.cardContainerWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.imageURL }}
              style={styles.image}
            />
          </View>
          <View style={styles.middlePart}>
            <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold, marginBottom: 24 }}>{product.productName}</Text>
            <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansRegular, color: COLORS.gray, marginBottom: 24 }}>{product.description}</Text>
            <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold }}>R {product.price}</Text>
          </View>
          <View style={styles.bottom}>
            {product.sizes.map((item, index) => (
              <TouchableOpacity key={index} style={styles.bottomLeft}>
                <Text style={{ color: COLORS.white, fontFamily: FONTS.DMSansBold }}>{item.charAt(0).toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.bottomRight}>
              <AntDesign name='shoppingcart' size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    marginTop: 50,
    marginHorizontal: 30,
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    paddingLeft: 25,
    paddingTop: 15,
  },
  cardContainerWrapper: {
    paddingTop: 20,
  },
  imageWrapper: {
    width: 230,
    height: 230,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CECECE',
    marginHorizontal: 25,
  },
  image: {
    width: 200,
    height: 200
  },
  middlePart: {
    marginTop: 26,
    marginLeft: 25,
    paddingRight: 15,
  },
  bottom: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginBottom: 30,
    marginTop: 30,
  },
  bottomLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    marginRight: 5,
  },
  bottomRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
    position: 'absolute',
    right: 0,
    top: -25,
    bottom: 0,
    marginRight: 40,
  },










  // bottomPart: {
  //   marginTop: 15,
  //   alignSelf: 'flex-start',
  //   alignItems: 'flex-end',
  //   flexDirection: 'row',
  //   marginLeft: 25,
  //   marginBottom: 50,
  // },
  // sizes: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 35,
  //   height: 35,
  //   borderRadius: 20,
  //   marginRight: 5,
  //   backgroundColor: COLORS.gray,
  // },
  // addToCart: {
  //   marginLeft: 90,
  //   alignSelf: 'flex-start',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   backgroundColor: COLORS.gray,
  // }
})