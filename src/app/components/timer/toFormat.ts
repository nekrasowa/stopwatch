export function toFormat(timer: number): string {
  const minutesCount = Math.floor(timer / 60);
  const minutes = twoDigits(minutesCount);

  const secCount = timer % 60;
  const sec = twoDigits(secCount);

  const timerString = `${minutes}:${sec}`;

  return timerString;
}

function twoDigits(num: number): string {
  return `0${num}`.slice(-2);
}
