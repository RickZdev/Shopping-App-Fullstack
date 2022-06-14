import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CategoryScreen from '../screens/CategoryScreen'
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import CollectionScreen from '../screens/CollectionScreen'
import HomeTab from '../screens/HomeTab'
import CartTab from '../screens/CartTab';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
    </Stack.Navigator>
  )
}

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartTab" component={CartTab} />
    </Stack.Navigator>
  )
}
export { HomeStack, CartStack }