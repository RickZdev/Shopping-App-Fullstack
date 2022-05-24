import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'
import MenuDrawer from '../components/MenuDrawer';
import CategoryList from '../components/CategoryList';
import FONTS from '../global/FONTS';

const CategoryScreen = ({ navigation, route }) => {
  const product = route.params;
  const headerName = product[0] ? product[0].categories.charAt(0).toUpperCase() + product[0].categories.slice(1) : 'Null';
  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        keyExtractor={(item => item.id)}
        renderItem={({ item }) => <CategoryList data={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerName}</Text>
            <MenuDrawer />
          </View>
        )}
      />
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,

  },
  headerTitle: {
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
  }
})