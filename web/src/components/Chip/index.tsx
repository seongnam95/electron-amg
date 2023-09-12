import styled from "styled-components";

interface ChipProps {
  text: string;
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
}

export function Chip({ text, ...rest }: ChipProps) {
  return <StyledChip {...rest}>{text}</StyledChip>;
}

const StyledChip = styled.span<{
  fontSize?: string;
  fontColor?: string;
  bgColor?: string;
}>`
  padding: 0.8rem 1rem 0.6rem 1rem;
  color: ${(p) => (p.fontColor ? p.fontColor : "var(--text-sub)")};
  font-size: ${(p) => (p.fontSize ? p.fontSize : "var(--font-size-2xs)")};
  background-color: ${(p) => (p.bgColor ? p.bgColor : "var(--canvas-color)")};
  border-radius: 0.2rem;
  white-space: nowrap;
`;
