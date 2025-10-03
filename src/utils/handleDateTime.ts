import dayjs from 'dayjs';
import isEmpty from 'lodash.isempty';

// plugins for advanced formatting
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export enum DATE_FORMAT {
  FIRST = 'DD/MM/YYYY',
  SECOND = 'h:mm A',
}

export const formatDate = (
  date: Date | string | number,
  format: DATE_FORMAT,
): string => {
  const _date = !isEmpty(date) ? date : new Date(date);
  return dayjs(_date).format(format);
};
