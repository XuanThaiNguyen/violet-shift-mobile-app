const images = {
  //images
  logo: require('../assets/images/logo.png'),

  //icons
  menu: require('../assets/icons/menu.png'),
  reload: require('../assets/icons/reload.png'),
  notification: require('../assets/icons/notification.png'),
  info: require('../assets/icons/info.png'),
  home: require('../assets/icons/home.png'),
  eyeShow: require('../assets/icons/eye-show.png'),
  eyeHide: require('../assets/icons/eye-hide.png'),
  logout: require('../assets/icons/logout.png'),
  squareTick: require('../assets/icons/square-tick.png'),
  back: require('../assets/icons/back.png'),
};

export default images;

export type IconTypes = keyof typeof images;
