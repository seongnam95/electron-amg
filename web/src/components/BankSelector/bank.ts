import bankCiti from "@images/banks/bank-citi.png";
import bankHana from "@images/banks/bank-hana.png";
import bankKakao from "@images/banks/bank-kakao.png";
import bankKb from "@images/banks/bank-kb.png";
import bankNh from "@images/banks/bank-nh.png";
import bankSh from "@images/banks/bank-sh.png";
import bankToss from "@images/banks/bank-toss.png";
import bankWoori from "@images/banks/bank-woori.png";

export const banks: Array<Bank> = [
  { iconUrl: bankKakao, value: "kakao", name: "카카오" },
  { iconUrl: bankToss, value: "toss", name: "토스" },
  { iconUrl: bankKb, value: "kb", name: "국민" },
  { iconUrl: bankNh, value: "nh", name: "농협" },
  { iconUrl: bankWoori, value: "woori", name: "우리" },
  { iconUrl: bankHana, value: "hana", name: "하나" },
  { iconUrl: bankCiti, value: "citi", name: "씨티" },
  { iconUrl: bankSh, value: "sh", name: "수협" },
];

interface Bank {
  iconUrl: string;
  value: string;
  name: string;
}
