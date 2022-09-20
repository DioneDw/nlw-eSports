// 18:00 --> ["18","00"] --> [18,00]
export function convertHourStringToMinutes(hoursString: String ){
  const [hour,minutes] = hoursString.split(':').map(Number);
  const minutesAmount = (hour * 60) + minutes;
  return minutesAmount;
}