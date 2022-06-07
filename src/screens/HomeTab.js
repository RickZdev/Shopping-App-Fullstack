import { Animated, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomMenuDrawerButton } from '../components/CustomButton';
import { useScrollToTop } from '@react-navigation/native';
import { auth, getPopular, getCategories } from '../database/firebase-config'
import HorizontalCard from '../components/HorizontalCard';
import Banner from '../components/Banner';
import CategoryCard from '../components/CategoryCard';
import { CustomHomeSkeleton } from '../components/CustomSkeletonCard';

const HomeTab = () => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [50, 130],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });
  const [newArrival, setNewArrival] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    let isMounted = true;
    getPopular(setNewArrival, 'New arrivals', isMounted, setIsloading)
    getPopular(setBestSellers, 'Best sellers', isMounted, setIsloading)
    getCategories(setCategories, categories, isMounted);

    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <>
      <StatusBar />
      <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: translation }] }]} >
        <Image
          source={require('../../assets/images/officialLogo.png')}
          resizeMode='contain'
          style={styles.logo}
        />
        <CustomMenuDrawerButton />
      </Animated.View>
      <Animated.ScrollView onScroll={Animated.event([{
        nativeEvent: {
          contentOffset: {
            y: scrolling,
          },
        },
      }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        style={styles.scrollViewContainer}
        ref={ref}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollViewWrapper}>
          {!isLoading ?
            <>
              <HorizontalCard headerTitle={'New arrivals'} data={newArrival} customStyle={{ marginTop: 10 }} />
              <Banner headerTitle={'Vans Venice collection'} />
              <CategoryCard headerTitle={"Shop by Category"} data={categories} />
              <HorizontalCard headerTitle={'Best sellers'} data={bestSellers} />
              <Banner headerTitle={'Vans Wayvee drop'} />
            </> : <CustomHomeSkeleton />
          }
        </View>
      </Animated.ScrollView>
    </>
  );
}

export default HomeTab

const styles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 32,
    paddingLeft: 20,
    backgroundColor: 'white',
    paddingVertical: 50,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewWrapper: {
    paddingTop: 100,
    backgroundColor: 'white',
  }
})






























// import React, { useEffect, useRef, useState } from 'react'
// import { StyleSheet, View, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native'
// import { CustomMenuDrawerButton } from '../components/CustomButton'
// import { auth, getPopular } from '../database/firebase-config'
// import CategoryCard from '../components/CategoryCard'
// import HorizontalCard from '../components/HorizontalCard'
// import Banner from '../components/Banner'
// import COLORS from '../global/COLORS'
// import { useScrollToTop } from '@react-navigation/native'

// const HomeTab = () => {
//   const [newArrival, setNewArrival] = useState([])
//   const [bestSellers, setBestSellers] = useState([])
//   const isMounted = useRef(true)
//   const ref = useRef(null);
//   useScrollToTop(ref);

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     }
//   }, [])

//   useEffect(() => {
//     getPopular(setNewArrival, 'New arrivals', isMounted)
//     getPopular(setBestSellers, 'Best sellers', isMounted)
//   }, [])

//   return (
//     <ScrollView ref={ref} style={styles.container} showsVerticalScrollIndicator={false}>
//       <StatusBar />
//       <SafeAreaView style={styles.containerWrapper}>
//         <View style={styles.headerWrapper}>
//           <Image
//             source={require('../../assets/images/officialLogo.png')}
//             resizeMode='contain'
//             style={styles.logo}
//           />
//           <CustomMenuDrawerButton />
//         </View>
//         <HorizontalCard headerTitle={'New arrivals'} data={newArrival} customStyle={{ marginTop: 10 }} />
//         <Banner headerTitle={'Vans Venice collection'} />
//         <CategoryCard headerTitle={"Shop by Category"} />
//         <HorizontalCard headerTitle={'Best sellers'} data={bestSellers} />
//         <Banner headerTitle={'Vans Wayvee drop'} />
//       </SafeAreaView>
//     </ScrollView>
//   )
// }

// export default HomeTab

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   headerWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingRight: 32,
//     paddingLeft: 20,
//     paddingVertical: 4,
//     marginTop: 19,
//     marginBottom: 16,
//   },
// })