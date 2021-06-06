const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : num
}

export const getTodayDate = () => {
  const date = new Date();

  return `${formatNumber(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

export const convertTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  return `${formatNumber(date.getDate())} ${monthNames[date.getMonth()]}`
}