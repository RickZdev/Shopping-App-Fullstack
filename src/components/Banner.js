import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import FONTS from '../global/FONTS'

const Banner = ({ headerTitle, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={styles.title}>{headerTitle}</Text>
      <TouchableOpacity style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/banner1.png')}
          resizeMode='contain'
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginLeft: 37,
    marginRight: 25,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.DMSansBold,
    marginBottom: -10,
  },
  image: {
    width: '100%',
  }
})