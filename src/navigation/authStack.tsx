import Login from '@features/authentication/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@themes/color';
import { MainStackScreenProps } from './mainStackScreenProps';
import Screen from './screen';

const Stack = createNativeStackNavigator<MainStackScreenProps>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
      initialRouteName={Screen.Login}
    >
      <Stack.Screen name={Screen.Login} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
