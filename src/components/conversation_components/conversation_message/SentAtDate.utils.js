export function monthToString(monthInt) {
  switch (monthInt) {
    case 0:
      return 'jan';
    case 1:
      return 'feb';
    case 2:
      return 'mar';
    case 3:
      return 'apr';
    case 4:
      return 'maj';
    case 5:
      return 'juni';
    case 6:
      return 'juli';
    case 7:
      return 'aug';
    case 8:
      return 'sep';
    case 9:
      return 'okt';
    case 10:
      return 'nov';
    case 11:
      return 'dec';
    default:
      return '';
  }
}

export function dateHourToString(dateHour) {
  if (dateHour.toString().length === 1) return `0${dateHour}`;
  else return dateHour;
}
export function dateMinuteToString(dateMinutes) {
  if (dateMinutes.toString().length === 1) return '0' + dateMinutes;
  else return dateMinutes;
}
