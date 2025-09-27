const images = {
  menu: require('../assets/icons/menu.png'),
  reload: require('../assets/icons/reload.png'),
  notification: require('../assets/icons/notification.png'),
  info: require('../assets/icons/info.png'),
  home: require('../assets/icons/home.png'),
};

export default images;

export type IconTypes = keyof typeof images;
