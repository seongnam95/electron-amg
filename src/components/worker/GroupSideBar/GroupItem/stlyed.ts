import styled, { css } from 'styled-components';

export interface GroupItemStyledProps {
  color?: string;
  activated?: boolean;
  disabled?: boolean;
}

export const GroupItemStyled = styled.li<GroupItemStyledProps>`
  display: flex;
  padding: 1rem 0;

  color: ${p => (p.activated ? p.theme.colors.primary : p.theme.colors.textColor2)};
  font-weight: ${p => (p.activated ? 'bold' : 'normal')};
  font-size: ${p => p.theme.sizes.textMedium};

  transition: all 140ms;

  cursor: ${p => (p.disabled ? 'default' : 'pointer')};

  .color-bar {
    background-color: ${p => p.color};
  }

  ${p =>
    !(p.activated || p.disabled) &&
    css`
      :hover {
        color: ${p.theme.colors.textColor1};
      }
    `}
`;
