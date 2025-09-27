import Login from '@features/authentication/login';
import Home from '@features/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackScreenProps } from './mainStackScreenProps';
import Screen from './screen';

const Stack = createNativeStackNavigator<MainStackScreenProps>();

const MainStack = () => {
  const currentUser = true;
  let initialRouteName = Screen.Home;
  if (!currentUser) {
    initialRouteName = Screen.Login;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={Screen.Home} component={Home} />
      <Stack.Screen name={Screen.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default MainStack;
