import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { logoutUser } from '../database/firebase-config'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation();
  const handlePressLogOut = () => {
    logoutUser(navigation);
  }
  return (
    <View style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: -1
    }}>
      <StatusBar />

      <TouchableOpacity onPress={handlePressLogOut} style={{ alignItems: 'center', justifyContent: 'center' }}>

        <Text>HAHAHAHA</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})