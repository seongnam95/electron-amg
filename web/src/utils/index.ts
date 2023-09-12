export function formatDate(
  dateString: string,
  point?: boolean,
  mini?: boolean
): string {
  const year = dateString.slice(0, 4);
  const month = parseInt(dateString.slice(4, 6));
  const day = parseInt(dateString.slice(6, 8));
  if (point) return `${year}.${month}.${day}`;
  else if (mini) return `${year}${month}${day}`;
  else return `${year}년 ${month}월 ${day}일`;
}
