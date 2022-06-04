import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerProgress } from '@react-navigation/drawer'
import COLORS from '../global/COLORS'
import { auth, logoutUser } from '../database/firebase-config'
import FONTS from '../global/FONTS'
import * as ImagePicker from 'expo-image-picker'
import { addAuthProfile } from '../database/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(auth.currentUser.photoURL);

  const handlePressSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log('current', auth.currentUser.photoURL);
    if (!result.cancelled) {
      setImageUri(result.uri)
      addAuthProfile(result.uri)
    }
  }

  const handleLogoutUser = () => {
    logoutUser(navigation)
  }

  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
            <Ionicons name="md-close-outline" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePressSelectPhoto}>
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: imageUri }}
                resizeMode='cover'
                style={styles.avatar}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userTextName}>{auth.currentUser.displayName}</Text>
            <Text style={styles.userTextEmail}>{auth.currentUser.email}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.footerContainer} onPress={() => handleLogoutUser()}>
        <SimpleLineIcons name="logout" size={18} color="black" style={styles.logoutIcon} />
        <Text style={styles.logoutText}> Sign Out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 25,
  },
  closeButton: {
    position: 'absolute',
    top: 5, right: 10,
  },
  avatarContainer: {
    backgroundColor: COLORS.white,
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetailsContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  userTextName: {
    fontFamily: FONTS.DMSansBold,
  },
  userTextEmail: {
    fontFamily: FONTS.DMSansRegular,
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray
  },
  logoutText: {
    fontFamily: FONTS.DMSansBold,
    fontSize: 12,
    letterSpacing: 1,
    paddingLeft: 10,
  },
})