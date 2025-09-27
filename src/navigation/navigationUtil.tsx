import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { MainStackScreenProps } from './mainStackScreenProps';

export const navigationRef =
  React.createRef<NavigationContainerRef<MainStackScreenProps>>();
