import { MainStackScreenProps } from './mainStackScreenProps';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackScreenProps {}
  }
}
