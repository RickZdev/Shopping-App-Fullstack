import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../global/COLORS'

const SizeButton = ({ data }) => {
  return (
    <>
      {data.sizes.forEach(size => (
        <TouchableOpacity style={styles.sizes}>
          <Text >{console.log(size)}</Text>
        </TouchableOpacity>
      ))}
    </>
  )
}

export default SizeButton

const styles = StyleSheet.create({
  width: 36,
  height: 36,
  backgroundColor: COLORS.gray
})