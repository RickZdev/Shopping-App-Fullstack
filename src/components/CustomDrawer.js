import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList, useDrawerProgress } from '@react-navigation/drawer'
import COLORS from '../global/COLORS'
import { auth, getUserPhoto, logoutUser } from '../database/firebase-config'
import FONTS from '../global/FONTS'
import * as ImagePicker from 'expo-image-picker'
import { updateUserPhoto } from '../database/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState('https://firebasestorage.googleapis.com/v0/b/shopping-app-be469.appspot.com/o/images%2Favatar%2Favatar.jpg?alt=media&token=e351f21f-5741-400a-9355-3fcf08865644');

  useEffect(() => {
    let isMounted = true;
    getUserPhoto(setImageUri);

    return () => {
      isMounted = false;
    }
  }, [])

  const handlePressSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUri(result.uri)
      updateUserPhoto(result.uri)

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