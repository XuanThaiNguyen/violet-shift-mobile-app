import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { StyleSheet } from 'react-native';
import { BOX_WIDTH } from '../constant';

export const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapper: {
      paddingHorizontal: SpacingDefault.normal,
    },
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
    viewAvailableOn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnAvailableBox: {
      borderWidth: 1,
      borderColor: colors.divider,
      paddingVertical: 8,
      borderRadius: 4,
      width: BOX_WIDTH,
      alignItems: 'center',
    },
    btnSave: {
      alignSelf: 'flex-end',
      paddingHorizontal: SpacingDefault.normal,
      backgroundColor: colors.primary,
      borderRadius: 4,
      paddingVertical: 8,
    },
  });
