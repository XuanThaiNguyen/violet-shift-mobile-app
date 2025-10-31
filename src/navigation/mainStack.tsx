import About from '@features/about';
import Availibility from '@features/availibility';
import SetAvailibility from '@features/availibility/setAvailibility';
import Home from '@features/home';
import AllShiftClients from '@features/home/allShiftClients';
import ShiftManager from '@features/home/detailShift';
import Notification from '@features/notification';
import Profile from '@features/profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@themes/color';
import { StyleSheet } from 'react-native';
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
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        contentStyle: styles.stackNavigator,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={Screen.Home} component={Home} />
      <Stack.Screen name={Screen.Notification} component={Notification} />
      <Stack.Screen name={Screen.About} component={About} />
      <Stack.Screen name={Screen.ShiftManager} component={ShiftManager} />
      <Stack.Screen name={Screen.Availibility} component={Availibility} />
      <Stack.Screen name={Screen.SetAvailibility} component={SetAvailibility} />
      <Stack.Screen name={Screen.Profile} component={Profile} />
      <Stack.Screen name={Screen.AllShiftClients} component={AllShiftClients} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  stackNavigator: {
    backgroundColor: colors.background,
  },
});

export default MainStack;
