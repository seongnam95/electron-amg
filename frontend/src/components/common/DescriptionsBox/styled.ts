import { HTMLAttributes } from 'react';

import styled from 'styled-components';

export interface DescriptionsBoxStyledProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  justify?: 'center' | 'start' | 'end';
}

export const DescriptionsBoxStyled = styled.div<DescriptionsBoxStyledProps>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  align-items: ${p => p.justify};
  white-space: nowrap;
  border-radius: 0.8rem;
  padding: 1.3rem 3rem 1.1rem;
  background-color: ${p => p.theme.colors.innerBg};

  .description-title {
    color: ${p => p.theme.colors.textColor2};
    font-size: ${p => p.theme.sizes.textMedium};
  }

  .description-content {
    color: ${p => p.theme.colors.textColor1};
    font-size: ${p => p.theme.sizes.textLarge};
    font-weight: bold;
    padding-top: 2px;
  }
`;
