import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import BottomTab from './BottomTab'
import COLORS from '../global/COLORS'
import CartTab from '../screens/CartTab'

const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator screenOptions={{ headerShown: false, drawerPosition: "right", drawerType: 'front' }} drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={BottomTab} />
        <Drawer.Screen name="CartDrawer" component={CartTab} />
      </Drawer.Navigator>
    </View>
  )
}

export default MenuDrawer

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    zIndex: -1,
    backgroundColor: COLORS.white,
  }
})