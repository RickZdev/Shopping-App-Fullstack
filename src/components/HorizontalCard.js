import React from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import COLORS from '../global/COLORS';
import FONTS from '../global/FONTS'
import { Feather } from '@expo/vector-icons'

const HorizontalCard = ({ headerTitle, data, customStyle }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.title}>{headerTitle}</Text>
      <FlatList

        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        initialNumToRender={5}
        keyExtractor={(item => item.id)}
        renderItem={({ item, index }) => (
          <View style={[styles.cardContainer, { marginLeft: index === 0 ? 12 : 0 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', item)}>
              <Image
                source={{ uri: item.imageURL }}
                style={styles.image}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.footerButton}>
              <Feather name='chevron-right' size={25} style={styles.back} color='black' />
            </TouchableOpacity>
            <Text style={styles.footerText}> View More </Text>
          </View>
        )}
      />
    </View>
  )
}

export default HorizontalCard

const styles = StyleSheet.create({
  title: {
    color: COLORS.black,
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
    marginBottom: 16,
    paddingLeft: 37
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 3,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: 130,
    height: 150,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  footerButton: {
    backgroundColor: COLORS.white,
    width: 35,
    height: 35,
    borderRadius: 20,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    marginTop: 15,
    fontFamily: FONTS.DMSansBold,
  },
})