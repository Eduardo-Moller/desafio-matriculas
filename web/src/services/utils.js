export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function formatTimeStamp(time) {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
}
  