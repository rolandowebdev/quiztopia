export const convertNumberToTimer = (num) => {
  let hours = Math.floor(num / 3600);
  let minutes = Math.floor((num - hours * 3600) / 60);
  let seconds = num - hours * 3600 - minutes * 60;

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}`;
};
