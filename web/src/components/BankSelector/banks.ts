import { BankIconType } from "../BankIcon";

interface Bank {
  value: BankIconType;
  name: string;
}

export const banks: Array<Bank> = [
  { value: "bank-kakao", name: "카카오뱅크" },
  { value: "bank-toss", name: "토스뱅크" },
  { value: "bank-nh", name: "NH농협" },
  { value: "bank-kb", name: "KB국민" },
  { value: "bank-sinhan", name: "신한" },
  { value: "bank-woori", name: "우리" },
  { value: "bank-ibk", name: "IBK기업" },
  { value: "bank-hana", name: "하나" },
  { value: "bank-k", name: "케이뱅크" },
  { value: "bank-cu", name: "신협" },
  { value: "bank-epost", name: "우체국" },
  { value: "bank-sc", name: "SC제일" },
  { value: "bank-sh", name: "Sh수협" },
  { value: "bank-citi", name: "씨티" },
];
