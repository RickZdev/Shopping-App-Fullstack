import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { CustomBackButton, CustomSizesButton } from '../components/CustomButton'
import { AntDesign } from '@expo/vector-icons'
import CustomBottomSheet from '../components/CustomBottomSheet'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'

const ProductDetailsScreen = ({ route }) => {
  const product = route.params;
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, [])

  return (
    <View style={[styles.container,]}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <CustomBackButton />
        </View>
        <View style={styles.cardContainerWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.imageURL }}
              style={[styles.image,]}
            />
          </View>
          <View style={styles.middlePart}>
            <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold, marginBottom: 24 }}>{product.productName}</Text>
            <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansRegular, color: COLORS.gray, marginBottom: 24 }}>{product.description}</Text>
            <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold }}>R {product.price}</Text>
          </View>
          <View style={styles.bottom}>
            <CustomSizesButton data={product} />
            <TouchableOpacity style={styles.bottomRight} onPress={() => handleOpenBottomSheet(0)}>
              <AntDesign name='shoppingcart' size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        isOpen ? <CustomBottomSheet bottomSheetRef={bottomSheetRef} isOpenBottomSheet={setIsOpen} /> : null
      }
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
})