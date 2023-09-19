import BankSpriteSVG from "@svg/bank-sprite-sheet.svg";

export type BankIconType =
  | "bank-k"
  | "bank-ibk"
  | "bank-epost"
  | "bank-sh"
  | "bank-nh"
  | "bank-hana"
  | "bank-sc"
  | "bank-kb"
  | "bank-kakao"
  | "bank-sinhan"
  | "bank-woori"
  | "bank-cu"
  | "bank-toss"
  | "bank-citi";

export function BankIcon({ bank }: { bank: BankIconType }) {
  return (
    <svg>
      <use href={`${BankSpriteSVG}#${bank}`} />
    </svg>
  );
}
