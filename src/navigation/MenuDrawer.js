import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/CustomDrawer'
import BottomTab from './BottomTab'
import COLORS from '../global/COLORS'
import OrdersDrawer from '../screens/OrdersDrawer'
import OrderHistoryDrawer from '../screens/OrderHistoryDrawer'
import EditDetailsDrawer from '../screens/EditDetailsDrawer'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import FONTS from '../global/FONTS'


const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerType: 'front',
          drawerLabelStyle: { marginLeft: -20, fontFamily: FONTS.DMSansBold, },
          drawerActiveBackgroundColor: COLORS.black,
          drawerActiveTintColor: COLORS.white,
        }}
        drawerContent={props => <CustomDrawer {...props} />} >
        <Drawer.Screen name="HomeDrawer" component={BottomTab} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="EditDetailsDrawer" component={EditDetailsDrawer}
          options={{
            drawerLabel: 'Edit Details',
            drawerIcon: ({ size, color }) => <Feather name="edit" size={size} color={color} />,
          }} />
        <Drawer.Screen name="OrdersDrawer" component={OrdersDrawer}
          options={{
            drawerLabel: 'Track My Orders',
            drawerIcon: ({ size, color }) => <Feather name="package" size={size} color={color} />,
          }} />
        <Drawer.Screen name="OrderHistoryDrawer" component={OrderHistoryDrawer}
          options={{
            drawerLabel: 'Order History',
            drawerIcon: ({ size, color }) => <MaterialCommunityIcons name="history" size={size} color={color} />,
          }} />
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