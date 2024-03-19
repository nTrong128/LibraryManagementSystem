export function formatDate(dateString: any) {
  let parts = dateString.split("/");
  let day = parts[0].length === 1 ? "0" + parts[0] : parts[0];
  let month = parts[1].length === 1 ? "0" + parts[1] : parts[1];
  let year = parts[2];
  day = day.substr(8, 10).trim();
  if (day.length === 1) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}
