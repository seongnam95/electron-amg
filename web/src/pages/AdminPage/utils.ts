import { ContractBodyType } from ".";

const convertDateToString = (date: string) => {
  const day = date.split("-")[0].slice(2, 4);
  return day + date.split("-")[1] + date.split("-")[2];
};

export const encodingData = (contract: ContractBodyType) => {
  const data = `${contract.salary},${contract.pay},${convertDateToString(
    contract.startPeriod
  )},${convertDateToString(contract.endPeriod)}`;
  const base64Encoded = btoa(data);
  return encodeURIComponent(base64Encoded);
};

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
