import { Modal } from '@components/modal';
import { SnackBar } from '@components/snackBar';
import { NavigationContainer } from '@react-navigation/native';
import useAuthStore from '@zustand/authStore';
import AuthStack from './authStack';
import MainDrawer from './mainDrawer';
import { navigationRef } from './navigationUtil';

const AppNavigator = () => {
  const { currentUser } = useAuthStore();

  return (
    <NavigationContainer ref={navigationRef}>
      <Modal />
      <SnackBar />
      {currentUser ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
