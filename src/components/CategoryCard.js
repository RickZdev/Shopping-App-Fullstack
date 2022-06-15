import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../global/COLORS';
import FONTS from '../global/FONTS';

const CategoryCard = ({ headerTitle, data }) => {
  const navigation = useNavigation();

  const alertBox = () => {
    Alert.alert('Sorry!', 'This category is currently empty.', [{ text: "Close", onPress: () => { } }]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headerTitle}</Text>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item => item.id)}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => item.products[0] ? navigation.navigate('CategoryScreen', item.products) : alertBox()}>
              <Image
                source={{ uri: item.icon }}
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
    height: 120
  },
})