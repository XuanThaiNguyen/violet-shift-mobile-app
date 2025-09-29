import { createDrawerNavigator } from '@react-navigation/drawer';
import { Dimensions } from 'react-native';
import CustomDrawerContent from './customDrawerContent';
import MainStack from './mainStack';
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
        headerShown: false,
      }}
      // eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={props => <CustomDrawerContent props={props} />}
    >
      <Drawer.Screen name={Screen.MainStack} component={MainStack} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
