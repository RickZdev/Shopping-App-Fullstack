import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native'
import { auth } from '../database/firebase-config'
import LoginScreen from './LoginScreen';
import MenuDrawer from '../navigation/MenuDrawer';

const SplashScreen = () => {
  const startAnimation = useRef(new Animated.Value(0)).current;
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get('window').height - 100,
          useNativeDriver: true
        })]).start();

      const unsubscribe = auth.onAuthStateChanged(user => {
        setAuthenticatedUser(user)
      })

      return (() => unsubscribe())
    }, 4000)
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashScreenContainer, { transform: [{ translateY: startAnimation }] }]}>
        <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require("../assets/images/splashScreenLogo.png")}
            resizeMode='contain'
            style={{ width: 100, height: 100 }}
          />
        </Animated.View>
      </Animated.View>
      {authenticatedUser ? <MenuDrawer /> : <LoginScreen />}
    </View >
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#252525'
  }
})



