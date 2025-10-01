import { SpacingDefault } from '@components/spacing/spacing';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: { flex: 1 },
    wrapper: { paddingHorizontal: SpacingDefault.normal },
    viewSet: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    viewSelect: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SpacingDefault.small,
    },
    btnRadio: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SpacingDefault.smaller,
    },
    viewToggleDay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
