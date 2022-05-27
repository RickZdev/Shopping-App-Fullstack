import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font'
import { LogBox } from 'react-native';
import AuthStack from './src/navigation/AuthStack';

const App = () => {
  // hidden yellow warnings
  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core']);
  LogBox.ignoreAllLogs(true)

  // load fonts
  const [loaded] = useFonts({
    DMSansRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    DMSansBold: require("./assets/fonts/DMSans-Bold.ttf")
  }); if (!loaded) return null;

  return (
    <NavigationContainer initialRouteName="SplashScreen">
      <AuthStack />
    </NavigationContainer>
  );
}

export default App;