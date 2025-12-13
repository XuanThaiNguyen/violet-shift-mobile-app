import dayjs from 'dayjs';
import isEmpty from 'lodash.isempty';

// plugins for advanced formatting
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { onCheckType } from './handleCommon';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(relativeTime);

export enum DATE_FORMAT {
  FIRST = 'DD/MM/YYYY',
  SECOND = 'h:mm A',
  THIRD = 'YYYY-MM-DD',
  FOUR = 'MMM YYYY',
  FIVE = 'HH:mm:ss DD/MM/YYYY',
}

export const formatDate = (
  date: Date | string | number,
  format: DATE_FORMAT,
): string => {
  const _date = !isEmpty(date) ? date : new Date(date);
  return dayjs(_date).format(format);
};

export const convertDateToMs = (
  date: Date | string | number,
  type: 'startOf' | 'endOf' = 'startOf',
) => {
  let _time = onCheckType(date, 'number') ? date : new Date(date).getTime();
  if (type === 'startOf') {
    return dayjs(_time).startOf('day').utc().unix() * 1000;
  }
  return dayjs(_time).endOf('day').utc().unix() * 1000;
};

export const getRangeByViewMode = (date: string | Date) => {
  const current = dayjs(date);

  let from: dayjs.Dayjs;
  let to: dayjs.Dayjs;

  from = current.startOf('week'); // Sunday as start
  to = current.endOf('week');

  return {
    from: from.toDate(),
    to: to.toDate(),
    fromUnix: from.valueOf(), // milliseconds (local)
    toUnix: to.valueOf(),
    fromString: from.format('YYYY-MM-DD HH:mm:ss'),
    toString: to.format('YYYY-MM-DD HH:mm:ss'),
  };
};

export const formatTimeRange = (fromMs: number, toMs: number): string => {
  const start = new Date(fromMs);
  const end = new Date(toMs);

  const isWholeDay =
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    start.getSeconds() === 0 &&
    start.getMilliseconds() === 0 &&
    end.getHours() === 23 &&
    end.getMinutes() === 59;

  if (isWholeDay) {
    return 'Whole day';
  }

  const format12 = (date: Date) => {
    const h = date.getHours() % 12 || 12;
    const m = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() < 12 ? 'am' : 'pm';
    return `${h}${m !== '00' ? ':' + m : ''}${ampm}`;
  };

  const fromStr = format12(start);
  const toStr = format12(end);

  return `${fromStr} - ${toStr}`;
};
