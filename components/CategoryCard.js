import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../database/firebase-config'
import COLORS from '../global/COLORS';
import FONTS from '../global/FONTS';

const CategoryCard = ({ headerTitle }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories(setCategories);
    console.log(categories);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerTitle}</Text>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item => item.id)}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity>
              {item.products.map(product => (
                <>
                </>
              ))}
              <Image
                source={require('../assets/images/categoryIcon.png')}
                style={styles.image}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
// jackets, shirts, socks, belts, pants, shoes
export default CategoryCard

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  title: {
    alignSelf: 'flex-start',
    paddingHorizontal: 37,
    color: COLORS.black,
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
  },
  cardContainer: {
    width: 100,
  },
  image: {
    width: '100%',
  },
})