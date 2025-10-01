import { Modal } from '@components/modal';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from '@zustand/authStore';
import AuthStack from './authStack';
import MainDrawer from './mainDrawer';
import { navigationRef } from './navigationUtil';

const AppNavigator = () => {
  const { currentUser } = useAuthStore();

  return (
    <NavigationContainer ref={navigationRef}>
      {currentUser ? <MainDrawer /> : <AuthStack />}
      <Modal />
    </NavigationContainer>
  );
};

export default AppNavigator;
