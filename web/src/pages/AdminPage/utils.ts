import { ContractBodyType } from ".";

const convertDateToString = (date: string) => {
  const day = date.split("-")[0].slice(2, 4);
  return day + date.split("-")[1] + date.split("-")[2];
};

function utf8ToBase64(str: string) {
  return window.btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}

export const encodingData = (data: ContractBodyType) => {
  data.startPeriod = convertDateToString(data.startPeriod);
  data.endPeriod = convertDateToString(data.endPeriod);

  const contractJson = encodeURIComponent(JSON.stringify(data));
  const base64Encoded = utf8ToBase64(contractJson);
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
