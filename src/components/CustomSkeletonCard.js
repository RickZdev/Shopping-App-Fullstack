import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SkeletonContainer, Skeleton } from "@nlazzos/react-native-skeleton";

const CustomHomeSkeleton = () => {
  return (
    <SkeletonContainer animation='wave'>
      <View style={styles.firstSection}>
        <Skeleton style={styles.firstSectionText} />
        <View style={styles.firstSectionImageCard}>
          {Array.from(Array(15).keys()).map((item, index) => (
            <Skeleton style={styles.imageCard} key={index} />
          ))}
        </View>
      </View>
      <View style={styles.secondSection}>
        <Skeleton style={styles.secondSectionText} />
        <Skeleton style={styles.secondImageCard} />
      </View>
      <View style={styles.firstSection}>
        <Skeleton style={styles.firstSectionText} />
        <View style={styles.firstSectionImageCard}>
          {Array.from(Array(15).keys()).map((_, index) => (
            <Skeleton style={styles.imageCard} key={index} />
          ))}
        </View>
      </View>
    </SkeletonContainer>
  )
}

const CustomCartSkeleton = () => {
  return (
    <SkeletonContainer animation='wave'>
      <Skeleton style={styles.cartCard} />
    </SkeletonContainer>
  )
}

export { CustomHomeSkeleton, CustomCartSkeleton }

const styles = StyleSheet.create({
  firstSection: {
    paddingLeft: 12,
    paddingTop: 10,
  },
  firstSectionText: {
    width: '50%',
    height: 21,
    borderRadius: 7,
    marginBottom: 16,
    marginLeft: 20,
  },
  firstSectionImageCard: {
    flexDirection: 'row',
    paddingLeft: -10,
  },
  imageCard: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 3,
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  secondSection: {
    marginLeft: 15,
    marginTop: 20,
  },
  secondSectionText: {
    width: '50%',
    height: 21,
    borderRadius: 7,
    marginBottom: 16,
    marginLeft: 20,
  },
  secondImageCard: {
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 18,
    borderRadius: 7,
    width: '90%',
    height: 230
  },
  cartCard: {
    width: '92%',
    height: 130,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
})