import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../global/COLORS'
import SHADOWS from '../global/SHADOWS'
import MenuDrawer from '../components/MenuDrawer'
import HorizontalCard from '../components/HorizontalCard'
import Banner from '../components/Banner'
import CategoryCard from '../components/CategoryCard'
import { getPopular } from '../database/firebase-config'

const HomeScreen = () => {
  const [newArrival, setNewArrival] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    getPopular(setNewArrival, 'New arrivals');
    getPopular(setBestSellers, 'Best sellers');
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar />
      <SafeAreaView style={styles.containerWrapper}>
        <View style={styles.headerWrapper}>
          <Image
            source={require('../assets/images/officialLogo.png')}
            resizeMode='contain'
            style={styles.logo}
          />
          <MenuDrawer />
        </View>
        <HorizontalCard headerTitle={'New arrivals'} data={newArrival} customStyle={{ marginTop: 10 }} />
        <Banner headerTitle={'Vans Venice collection'} customStyle={{ marginTop: 30 }} />
        <CategoryCard headerTitle={'Shop by category'} />
        <HorizontalCard headerTitle={'Best sellers'} data={bestSellers} />
        <Banner headerTitle={'Vans Wayvee drop'} customStyle={{ marginTop: 15 }} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 32,
    paddingLeft: 20,
    marginTop: 23,
    marginBottom: 20
  },
})