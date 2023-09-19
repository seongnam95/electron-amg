import { BankIconType } from "../BankIcon";

interface BankType {
  icon: BankIconType;
  name: string;
}

export const banks: Array<BankType> = [
  { icon: "bank-kakao", name: "카카오뱅크" },
  { icon: "bank-toss", name: "토스뱅크" },
  { icon: "bank-nh", name: "NH농협" },
  { icon: "bank-kb", name: "KB국민" },
  { icon: "bank-sinhan", name: "신한" },
  { icon: "bank-woori", name: "우리" },
  { icon: "bank-ibk", name: "IBK기업" },
  { icon: "bank-hana", name: "하나" },
  { icon: "bank-k", name: "케이뱅크" },
  { icon: "bank-cu", name: "신협" },
  { icon: "bank-epost", name: "우체국" },
  { icon: "bank-sc", name: "SC제일" },
  { icon: "bank-sh", name: "Sh수협" },
  { icon: "bank-citi", name: "씨티" },
];
