import React, { useRef } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomMenuDrawerButton } from '../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';
import CategoryList from '../components/CategoryList';
import COLORS from '../global/COLORS';
import FONTS from '../global/FONTS';

const CategoryScreen = ({ route }) => {
  const listRef = useRef(null);
  const product = route.params;
  const headerName = product[0] ? product[0].categories.charAt(0).toUpperCase() + product[0].categories.slice(1) : 'Null';
  const scrolling = useRef(new Animated.Value(0)).current;
  const translation = scrolling.interpolate({
    inputRange: [0, 100],
    outputRange: [100, -30],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              y: scrolling,
            },
          },
        }], { useNativeDriver: true })}
        ref={listRef}
        data={product}
        keyExtractor={(item => item.id)}
        renderItem={({ item }) => <CategoryList data={item} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{headerName}</Text>
            <CustomMenuDrawerButton />
          </View>
        )}
      />
      <TouchableOpacity opacity={1} style={[styles.scrollToTopButton, { transform: [{ translateY: translation }], }]} onPress={() => listRef.current.scrollToOffset({ offset: 0, animated: true })}>
        <AntDesign name="arrowup" size={18} color="black" />
      </TouchableOpacity>
    </View >
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  headerTitle: {
    fontSize: 21,
    fontFamily: FONTS.DMSansBold,
  },
  scrollToTopButton: {
    width: 55,
    height: 55,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, right: 30
  }
})