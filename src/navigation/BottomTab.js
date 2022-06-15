import React, { useEffect, useState } from 'react'
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { Octicons, Feather, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, CartStack } from './AppStack';
import { getNumberOfCart } from '../database/firebase-config';
import SearchTab from '../screens/SearchTab'
import SettingsTab from '../screens/SettingsTab'
import COLORS from '../global/COLORS';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const [numberOfCart, setNumberOfCart] = useState(0);

  useEffect(() => {
    let isMount = true;
    getNumberOfCart(setNumberOfCart);

    return () => {
      isMount = false;
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: 'flex',
            height: 78,
            elevation: 0,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Octicons name='home' size={22} color={focused ? COLORS.black : 'gray'} />
            ),
          }}
        />
        <Tab.Screen name="SearchTab" component={SearchTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name='search' size={23} color={focused ? COLORS.black : 'gray'} />
            )
          }}
        />
        <Tab.Screen name="CartStack" component={CartStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <AntDesign name='shoppingcart' size={24} color={focused ? COLORS.black : 'gray'} />
                {
                  numberOfCart !== 0 ?
                    <View style={{ position: 'absolute', right: -3, top: -3, backgroundColor: focused ? 'red' : 'gray', borderRadius: 10 }}>
                      <Text style={{ color: 'white', fontSize: 9, paddingHorizontal: 2, paddingVertical: 1 }}> {numberOfCart} </Text>
                    </View> : null
                }
              </View>

            )
          }}
        />
        <Tab.Screen name="SettingsTab" component={SettingsTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="add-circle-outline" size={24} color={focused ? COLORS.black : 'gray'} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    zIndex: -1,
    backgroundColor: COLORS.white,
  }
})