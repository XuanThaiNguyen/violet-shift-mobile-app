import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App';

import './src/utils/reactotronConfig';

const VioletShift = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => VioletShift);
