import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

const CustomBottomSheet = ({ bottomSheetRef, isOpenBottomSheet }) => {
  const snapPoints = useMemo(() => ['35%', '100%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('HandleSheetChanges', index);
  }, [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      onClose={() => isOpenBottomSheet(false)}
      animateOnMount={true}
      style={styles.container}
    >
      <BottomSheetView >
        <Text> HI! </Text>
      </BottomSheetView>
    </BottomSheet>
  )
}

export default CustomBottomSheet

const styles = StyleSheet.create({
  container: {
    shadowColor: '',
    elevation: 15,
    borderRadius: 25,
  }
})