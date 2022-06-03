import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native'
import { CustomMenuDrawerButton } from '../components/CustomButton'
import { auth, getPopular } from '../database/firebase-config'
import CategoryCard from '../components/CategoryCard'
import HorizontalCard from '../components/HorizontalCard'
import Banner from '../components/Banner'
import COLORS from '../global/COLORS'

const HomeTab = () => {
  const [newArrival, setNewArrival] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, [])

  useEffect(() => {
    getPopular(setNewArrival, 'New arrivals', isMounted)
    getPopular(setBestSellers, 'Best sellers', isMounted)
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar />
      <SafeAreaView style={styles.containerWrapper}>
        <View style={styles.headerWrapper}>
          <Image
            source={require('../../assets/images/officialLogo.png')}
            resizeMode='contain'
            style={styles.logo}
          />
          <CustomMenuDrawerButton />
        </View>
        <HorizontalCard headerTitle={'New arrivals'} data={newArrival} customStyle={{ marginTop: 10 }} />
        <Banner headerTitle={'Vans Venice collection'} customStyle={{ marginTop: 30 }} />
        <CategoryCard headerTitle={"Shop by Category"} />
        <HorizontalCard headerTitle={'Best sellers'} data={bestSellers} />
        <Banner headerTitle={'Vans Wayvee drop'} customStyle={{ marginTop: 15 }} />
      </SafeAreaView>
    </ScrollView>
  )
}

export default HomeTab

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
    paddingVertical: 4,
    marginTop: 19,
    marginBottom: 16,
  },
})