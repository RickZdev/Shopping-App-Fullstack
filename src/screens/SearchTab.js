import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, Feather, AntDesign, Ionicons } from '@expo/vector-icons'
import COLORS from '../global/COLORS'
import { getAllProducts } from '../database/firebase-config'
import CategoryList from '../components/CategoryList'

const SearchTab = () => {
  const [productsDb, setProductsDb] = useState([]);
  const [productsDb2, setProductsDb2] = useState([]);
  const [masterData, setMasterData] = useState([])
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getAllProducts(setProductsDb);
    setMasterData(productsDb)
  }, [])

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.productName.toLowerCase().includes(text.toLowerCase());
        return itemData
      })
      setProductsDb2(newData);
    } else {
      setProductsDb2([]);
    }
    setSearchText(text)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarWrapper}>
          <TextInput
            style={styles.searchTextInput}
            value={searchText}
            placeholder='Search'
            onChangeText={(text) => searchFilter(text)}
          />
          <Feather name='search' size={18} color='black' style={styles.searchIcon} />
          <MaterialIcons name="keyboard-voice" size={24} color="black" style={styles.voiceIcon} />
        </View>
      </View>
      <FlatList
        data={productsDb2}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingTop: 5, }}>
            <CategoryList data={item} />
          </View>
        )}
      />
    </View>
  )
}

export default SearchTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchBarContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 10,
    backgroundColor: COLORS.white
  },
  searchBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 45,
  },
  searchTextInput: {
    backgroundColor: '#E5E5E5',
    width: '80%',
    height: 36,
    borderRadius: 10,
    paddingLeft: 40,
  },
  voiceIcon: {
    position: 'absolute',
    right: 45
  }
})