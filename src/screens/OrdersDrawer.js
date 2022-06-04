import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CustomBackButton } from '../components/CustomButton'

const OrdersDrawer = () => {
  return (
    <View>
      <CustomBackButton />
      <Text>OrdersDrawer</Text>
    </View>
  )
}

export default OrdersDrawer

const styles = StyleSheet.create({})