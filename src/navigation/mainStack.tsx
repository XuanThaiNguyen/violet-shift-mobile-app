import About from '@features/about';
import Availibility from '@features/availibility';
import SetAvailibility from '@features/availibility/setAvailibility';
import Home from '@features/home';
import AddProgress from '@features/home/addProgress';
import AddSignature from '@features/home/addSignature';
import AllShiftClients from '@features/home/allShiftClients';
import ShiftManager from '@features/home/detailShift';
import ProgressDetail from '@features/home/progressDetail';
import ShiftInstruction from '@features/home/shiftInstruction';
import ShiftSignature from '@features/home/shiftSignature';
import UpdateProgress from '@features/home/updateProgress';
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
      <Stack.Screen name={Screen.AddProgress} component={AddProgress} />
      <Stack.Screen name={Screen.UpdateProgress} component={UpdateProgress} />
      <Stack.Screen name={Screen.ProgressDetail} component={ProgressDetail} />
      <Stack.Screen name={Screen.ShiftSignature} component={ShiftSignature} />
      <Stack.Screen name={Screen.AddSignature} component={AddSignature} />
      <Stack.Screen
        name={Screen.ShiftInstruction}
        component={ShiftInstruction}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  stackNavigator: {
    backgroundColor: colors.background,
  },
});

export default MainStack;
