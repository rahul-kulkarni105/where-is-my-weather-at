export const dayAsString = (dayIndex) => {
  // create an empty array of 7 week days
  const weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  return weekdays[dayIndex];
}

// daysToAdd from the current day,
// could mean you can get next 30 days on=f the month as well
export const getDates = (daysToAdd = 7) => {
  const weekDays = [];
  const startDate = new Date();

  for (let i = 0; i <= daysToAdd; i++) {
      const currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      weekDays.push(dayAsString(currentDate.getDay()));
  }
  return weekDays; // format ['Sunday', 'Monday', ''Tuesday'...]
  // where at index 0 will be today's day
}