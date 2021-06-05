const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const formatDay = (date: Date) => {
  return date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
}

export const getTodayDate = () => {
  const date = new Date();

  return `${formatDay(date)} ${monthNames[date.getMonth()]} ${date.getFullYear()}`
}