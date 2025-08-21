import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js'; dayjs.extend(isoWeek);

export function weekRange(year, week){
  const start = dayjs().year(year).isoWeek(week).startOf('week').toDate();
  const end = dayjs(start).endOf('week').toDate();
  return { start, end };
}

export function isEligibleByRotation(rotationOrder, telegramId, year, week){
  if (!rotationOrder?.length) return true;
  const idx = (year*53 + week) % rotationOrder.length;
  return String(rotationOrder[idx]) === String(telegramId);
}
