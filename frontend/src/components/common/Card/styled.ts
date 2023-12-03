import styled from 'styled-components';

export interface CardStyledProps {
  width?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
}

export const CardStyled = styled.div`
  border-radius: 1.2rem;
  background-color: ${p => p.theme.colors.contentBG};
  box-shadow: rgba(160, 160, 160, 0.2) 0 8px 32px;

  .card-header {
    padding: 2rem 3rem 0;

    .card-title {
      display: flex;
      gap: 1.2rem;
      align-items: center;
      font-size: ${p => p.theme.sizes.textLarge};
      font-weight: bold;
    }
  }

  .card-content {
    flex: 1;
    padding: 2rem 3rem;
  }
`;
