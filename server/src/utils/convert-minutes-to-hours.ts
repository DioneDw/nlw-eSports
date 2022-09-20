// 1080  --> 

export function convertMinutesToHoursString(minutes: number){
  const fullHour = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  return `${String(fullHour).padStart(2,'0')}:${String(restMinutes).padStart(2,'0')}`
}