import { SpacingDefault } from '@components/spacing/spacing';
import colors from '@themes/color';
import { isIos } from '@themes/constant';
import { Insets, StyleSheet } from 'react-native';

const HEADER_EXPANDABLE_CALENDAR_HEIGHT = 102;
const SPACING_HEADER = 24;

export const useStyles = (insets: Insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    icon32: {
      width: 32,
      height: 32,
    },
    btnOnSet: {
      width: 48,
      height: 48,
      backgroundColor: colors.primary,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: insets.bottom || 16,
      right: SpacingDefault.mediumPlush,
    },
    icon20: {
      width: 20,
      height: 20,
    },
    flatlistContainer: {
      marginTop: HEADER_EXPANDABLE_CALENDAR_HEIGHT + SPACING_HEADER,
      paddingBottom: isIos
        ? 16
        : HEADER_EXPANDABLE_CALENDAR_HEIGHT + SPACING_HEADER,
    },
    empty: {
      borderWidth: 1,
      borderColor: colors.divider,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    },
  });
