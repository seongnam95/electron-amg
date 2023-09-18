export type SvgIconId = "kakao" | "kb";

export function BankIcon(id: SvgIconId) {
  return (
    <svg>
      <use href={`#${id}`}></use>
    </svg>
  );
}
