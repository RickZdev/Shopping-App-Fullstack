import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { CustomBackButton, CustomLikeButton, CustomSizesButton } from '../components/CustomButton'
import { AntDesign } from '@expo/vector-icons'
import CustomBottomSheet from '../components/CustomBottomSheet'
import COLORS from '../global/COLORS'
import FONTS from '../global/FONTS'
import { addLike, getLikes, getNumberOfLikes } from '../database/firebase-config';

const ProductDetailsScreen = ({ route, navigation }) => {
  const product = route.params;
  const bottomSheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderSize, setOrderSize] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getLikes(setIsLike, product, isMounted);
    getNumberOfLikes(setNumberOfLikes, product, isMounted);

    return () => {
      isMounted = false;
    }
  }, [])

  const handleOpenBottomSheet = useCallback((index) => {
    if (product.quantity <= 0) {
      Alert.alert('OUT OF STOCK', 'THIS PRODUCT IS CURRENTLY OUT OF STOCK.', [{ text: "Okay", onPress: () => { } }]);
    } else {
      bottomSheetRef.current?.snapToIndex(index);
      setIsOpen(true);
    }

  }, [])

  const handlePressLike = () => {
    addLike(isLike, setIsLike, product);
  }

  return (
    <ScrollView contentContainerStyle={[styles.container,]}>
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <CustomBackButton />
          <CustomLikeButton isLike={isLike} handlePressLike={handlePressLike} />
        </View>
        <View style={styles.cardContainerWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: product.imageURL }}
              style={[styles.image,]}
              resizeMode='contain'
            />
          </View>
          <View style={styles.middlePart}>
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold, }}>{product.productName}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansBold, paddingTop: 5, color: COLORS.gray }}>Liked by: {numberOfLikes}</Text>
                {product.quantity > 0 ?
                  <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansBold, paddingTop: 5, color: COLORS.gray }}>Quantity: {product.quantity}</Text> :
                  <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansBold, paddingTop: 5, color: COLORS.gray }}>Out of Stock</Text>
                }
              </View>
            </View>
            <Text style={{ fontSize: 12, fontFamily: FONTS.DMSansRegular, color: COLORS.gray, marginBottom: 24 }}>{product.description}</Text>
            <Text style={{ fontSize: 18, fontFamily: FONTS.DMSansBold }}>P{product.price}</Text>
          </View>
          <View style={styles.bottom}>
            <CustomSizesButton data={product} setOrderSize={setOrderSize} />
            <TouchableOpacity style={styles.bottomRight} onPress={() => handleOpenBottomSheet(0)}>
              <AntDesign name='shoppingcart' size={30} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        // bottom sheet
        isOpen ? <CustomBottomSheet bottomSheetRef={bottomSheetRef} isOpenBottomSheet={setIsOpen}
          setQuantity={setOrderQuantity} quantity={orderQuantity} product={product} size={orderSize} /> : null
      }
    </ScrollView>
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
    paddingTop: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    height: '80%'
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