import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'
import SHADOWS from '../global/SHADOWS'
import { Feather } from '@expo/vector-icons'
import { logoutUser } from '../database/firebase-config'
import { useNavigation } from '@react-navigation/native'

const MenuDrawer = () => {
  const navigation = useNavigation();

  const handlePressLogOut = () => {
    logoutUser(navigation);
  }

  return (
    <TouchableOpacity style={styles.menuWrapper} onPress={handlePressLogOut}>
      <Feather name='menu' size={25} style={styles.menu} />
    </TouchableOpacity>
  )
}

export default MenuDrawer

const styles = StyleSheet.create({
  menuWrapper: {
    backgroundColor: COLORS.white,
    width: 54,
    height: 54,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.dark
  },
})