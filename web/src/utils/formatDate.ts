export function formatDate(
  dateString: string,
  point?: boolean,
  mini?: boolean
): string {
  const year = dateString.split("-")[0];
  const month = Number(dateString.split("-")[1]);
  const day = Number(dateString.split("-")[2]);
  if (point) return `${year}.${month}.${day}`;
  else if (mini) return `${year}${month}${day}`;
  else return `${year}년 ${month}월 ${day}일`;
}
