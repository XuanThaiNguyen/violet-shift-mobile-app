import colors from '@themes/color';

export const CalendarTheme = {
  textSectionTitleColor: colors.secondaryText,
  selectedDayTextColor: colors.white,
  todayTextColor: colors.primaryButton,
  dayTextColor: colors.primaryText,
  textDisabledColor: colors.disabledBox,

  selectedDayBackgroundColor: colors.primaryButton,
  todayBackgroundColor: 'transparent',

  // Calendar background
  calendarBackground: colors.white,

  textDayFontSize: 14,
  textMonthFontSize: 16,

  // Ensure week day headers render correctly
  'stylesheet.calendar.header': {
    week: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      fontSize: 12,
      color: colors.secondaryText, // Ensure day names (S M T W T F S) are colored
    },
  },
};
