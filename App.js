import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native';
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import BottomTabScreen from './screens/BottomTabScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // hidden yellow warning
  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreAllLogs(true)

  // load fonts
  const [loaded] = useFonts({
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf")
  }); if (!loaded) return null;

  return (
    <NavigationContainer initialRouteName="SplashScreen">
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={BottomTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;