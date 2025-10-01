import About from '@features/about';
import Availibility from '@features/availibility';
import SetAvailibility from '@features/availibility/setAvailibility';
import Home from '@features/home';
import DetailShift from '@features/home/detailShift';
import Notification from '@features/notification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '@themes/color';
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
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name={Screen.Home} component={Home} />
      <Stack.Screen name={Screen.Notification} component={Notification} />
      <Stack.Screen name={Screen.About} component={About} />
      <Stack.Screen name={Screen.DetailShift} component={DetailShift} />
      <Stack.Screen name={Screen.Availibility} component={Availibility} />
      <Stack.Screen name={Screen.SetAvailibility} component={SetAvailibility} />
    </Stack.Navigator>
  );
};

export default MainStack;
