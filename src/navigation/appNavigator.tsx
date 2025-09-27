import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './authStack';
import MainDrawer from './mainDrawer';
import { navigationRef } from './navigationUtil';

const AppNavigator = () => {
  let currentUser = true;

  return (
    <NavigationContainer ref={navigationRef}>
      {currentUser ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
