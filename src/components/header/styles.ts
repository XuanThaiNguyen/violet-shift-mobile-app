import { SpacingDefault } from '@components/spacing/spacing';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#122b38',
      paddingHorizontal: SpacingDefault.normal,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    icon20: {
      width: 20,
      height: 20,
    },
  });
