import dayjs from 'dayjs';

export function formatPhoneNumber(phoneNumber: string) {
  const match = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

export function formatSSN(ssn: string) {
  const match = ssn.match(/^(\d{6})(\d{7})$/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }
  return ssn;
}

export function formatDay(day: string, format?: string) {
  return dayjs(day).format(format ?? 'YY년 M월 D일');
}
