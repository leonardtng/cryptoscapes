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
}
