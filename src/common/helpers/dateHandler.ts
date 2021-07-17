import { roundDecimals } from "./numberHandler";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const formatDay = (num: number) => {
  return num < 10 ? `0${num}` : num
};

export const getTodayDate = () => {
  const date = new Date();

  return `${formatDay(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
};

export const convertTimestamp = (timestamp: number, year: boolean = false) => {
  const date = new Date(timestamp);

  return `${formatDay(date.getDate())} ${monthNames[date.getMonth()]} ${year ? date.getFullYear() : ''}`
};

export const convertIsoString = (IsoString: string) => {
  const date = new Date(IsoString);

  return `${formatDay(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
};

export const getTimeFromNow = (IsoString: string) => {
  const date = new Date(IsoString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 3.6e+6) return `${roundDecimals(diff / 60000, 0)}min`
  if (diff < 8.64e+7) return `${roundDecimals(diff / 3.6e+6, 0)}h`
  return `${roundDecimals(diff / 8.64e+7, 0)}d`
};
