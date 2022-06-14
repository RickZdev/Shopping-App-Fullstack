import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import COLORS from '../global/COLORS'
import { getCollection } from '../database/firebase-config';
import { CustomBackButton, CustomMenuDrawerButton } from '../components/CustomButton';
import FONTS from '../global/FONTS';
import CategoryList from '../components/CategoryList';

const CollectionScreen = ({ route }) => {
  const { bannerName, headerText, headerDescription } = route.params;
  const [collectionDb, setCollectionDb] = useState([]);
  const [collectionImage, setCollectionImage] = useState('https://firebasestorage.googleapis.com/v0/b/shopping-app-be469.appspot.com/o/images%2Fbanner%2FVans%20Venice%20Collection.png?alt=media&token=6b7303e1-172c-43f1-8c5e-ea84e750623e');
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    getCollection(bannerName, setCollectionDb, setCollectionImage)
  }, [])

  const headerComponent = () => (
    <View style={styles.header}>
      <View style={styles.headerButton}>
        <CustomBackButton />
        <CustomMenuDrawerButton />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: collectionImage }}
          resize='contain'
          style={[styles.image, { width: windowWidth }]}
        />
        <Image
          source={require('../../assets/images/filter.png')}
          resize='contain'
          style={[styles.image, { width: windowWidth, position: 'absolute' }]}
        />
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={[styles.headerText, { fontFamily: FONTS.DMSansBold, fontSize: 18, paddingBottom: 10, }]}>{headerText}</Text>
        <Text style={[styles.headerText, { fontFamily: FONTS.DMSansRegular, fontSize: 12, }]}>{headerDescription}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar showHideTransition='slide' backgroundColor='white' barStyle='light-content' />
      <FlatList
        ListHeaderComponent={headerComponent}
        data={collectionDb}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: COLORS.white }}>
            <CategoryList data={item} />
          </View>
        )}
      />
    </View >
  )
}

export default CollectionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: 500
  },
  header: {
    overflow: 'visible',
    marginBottom: 10,
  },
  headerButton: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 15,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  headerText: {
    color: COLORS.white,
  },
})