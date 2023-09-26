export function getDefaultDate() {
  const currentDate = new Date();
  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  return {
    today: formatDate(currentDate),
    endOfMonth: formatDate(lastDate),
  };
}
