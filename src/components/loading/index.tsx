import colors from '@themes/color';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return <></>;

  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="small" color={colors.white} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
