import { SpacingDefault } from '@components/spacing/spacing';
import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: '#122b38',
      paddingHorizontal: SpacingDefault.normal,
      paddingTop: 8,
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
    icon16: {
      width: 16,
      height: 16,
    },
    btnBack: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SpacingDefault.smaller,
    },
  });
