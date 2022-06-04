import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CategoryScreen from '../screens/CategoryScreen'
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen'
import HomeTab from '../screens/HomeTab'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
      <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
    </Stack.Navigator>
  )
}
export { HomeStack }