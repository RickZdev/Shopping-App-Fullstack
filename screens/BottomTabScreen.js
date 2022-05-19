import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './HomeTab'
import SearchTab from './SearchTab'
import SettingsTab from './SettingsTab'
import CartTab from './CartTab'
import COLORS from '../global/COLORS';
import { Octicons, Feather, AntDesign, Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
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
          }
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <Octicons name='home' size={22} color={focused ? COLORS.black : 'gray'} />
            )
          }}
        />
        <Tab.Screen name="SearchTab" component={SearchTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather name='search' size={23} color={focused ? COLORS.black : 'gray'} />
            )
          }}
        />
        <Tab.Screen name="CartTab" component={CartTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View>
                <AntDesign name='shoppingcart' size={24} color={focused ? COLORS.black : 'gray'} />
                <View style={{ position: 'absolute', right: -3, top: -3, backgroundColor: 'black', borderRadius: 10 }}>
                  <Text style={{ color: 'white', fontSize: 9, paddingHorizontal: 2, paddingVertical: 1 }}> 5 </Text>
                </View>
              </View>
            )
          }}
        />
        <Tab.Screen name="SettingsTab" component={SettingsTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name='settings-outline' size={24} color={focused ? COLORS.black : 'gray'} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default BottomTabScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    zIndex: -1,
    backgroundColor: COLORS.white,
  }
})