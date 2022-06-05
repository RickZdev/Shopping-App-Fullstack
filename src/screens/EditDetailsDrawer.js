import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { CustomMenuDrawerButton } from '../components/CustomButton';
import { useScrollToTop } from '@react-navigation/native';
import { auth, getPopular } from '../database/firebase-config'
import HorizontalCard from '../components/HorizontalCard';
import Banner from '../components/Banner';
import CategoryCard from '../components/CategoryCard';

const EditDetailsDrawer = () => {

  return (
    <>
      <Text> Edit Details Drawer </Text>
    </>
  );
}

export default EditDetailsDrawer

const styles = StyleSheet.create({

})