import Login from '@features/authentication/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@themes/color';
import { StyleSheet } from 'react-native';
import { MainStackScreenProps } from './mainStackScreenProps';
import Screen from './screen';

const Stack = createNativeStackNavigator<MainStackScreenProps>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: styles.stackNavigator,
      }}
      initialRouteName={Screen.Login}
    >
      <Stack.Screen name={Screen.Login} component={Login} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  stackNavigator: {
    backgroundColor: colors.background,
  },
});

export default AuthStack;
