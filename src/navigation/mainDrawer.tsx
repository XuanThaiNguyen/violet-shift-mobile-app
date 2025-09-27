import About from '@features/about';
import Home from '@features/home';
import Notification from '@features/notification';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './customDrawerContent';
import Screen from './screen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: SCREEN_WIDTH / 1.5,
        },
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent props={props} />}
    >
      <Drawer.Screen
        name={Screen.Home}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={Screen.Notification}
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={Screen.About}
        component={About}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
