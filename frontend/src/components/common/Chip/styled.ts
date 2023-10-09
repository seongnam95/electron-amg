import { HTMLAttributes } from 'react';

import styled from 'styled-components';

export interface ChipStyledProps extends HTMLAttributes<HTMLSpanElement> {
  $color?: string;
  $bgColor?: string;
  $borderColor?: string;
  $fullWidth?: boolean;
  $size?: 'small' | 'medium' | 'lazy';
}

export const ChipStyled = styled.span<ChipStyledProps>`
  --padding: ${p =>
    p.$size === 'small'
      ? '0.3rem 0.7rem 0.1rem'
      : p.$size === 'lazy'
      ? '0.9rem 1.6rem 0.7rem'
      : '0.5rem 1rem 0.3rem'};
  --fontSize: ${p => (p.$size === 'small' ? '1.2rem' : p.theme.sizes.textSmall)};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: ${p => (p.$fullWidth ? '100%' : 'auto')};
  padding: var(--padding);
  border: 1px solid ${p => (p.$borderColor ? p.$borderColor : p.theme.colors.borderColor)};
  border-radius: 0.4rem;
  background-color: ${p => (p.$bgColor ? p.$bgColor : p.theme.colors.innerBg)};

  color: ${p => (p.$color ? p.$color : p.theme.colors.textColor2)};
  font-size: var(--fontSize);
  white-space: nowrap;
`;
