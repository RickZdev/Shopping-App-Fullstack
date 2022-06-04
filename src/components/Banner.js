import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, } from 'react-native'
import FONTS from '../global/FONTS'

const Banner = ({ headerTitle }) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{headerTitle}</Text>
      <ImageBackground
        source={require('../../assets/images/banner1.png')}
        style={styles.image}
        resizeMode='contain' />
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 25,
    marginVertical: 30,
    width: '90%',
    height: 230,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.DMSansBold,
    paddingLeft: 16,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  }
})