
export function sleep(delay) {
  let start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
