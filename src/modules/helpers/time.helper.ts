import * as dayjs from 'dayjs';

export const timeStampToDate = (
  timestamp: number,
  format: string = 'YYYY-MM-DD HH:mm:ss',
) => {
  const timer = dayjs.unix(timestamp);
  return timer.format(format);
};

export const dateToTimestamp = (date) => {
  return dayjs(date).unix();
};
