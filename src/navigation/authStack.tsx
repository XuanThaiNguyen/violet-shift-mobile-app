import Login from '@features/authentication/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackScreenProps } from './mainStackScreenProps';
import Screen from './screen';

const Stack = createNativeStackNavigator<MainStackScreenProps>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Screen.Login}
    >
      <Stack.Screen name={Screen.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
