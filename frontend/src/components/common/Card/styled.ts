import styled from 'styled-components';

export const CardStyled = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 3rem;

  border-radius: 1.2rem;
  padding: 2.4rem;
  background-color: ${p => p.theme.colors.contentBG};
  box-shadow: rgba(160, 160, 160, 0.2) 0 8px 32px;

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-size: ${p => p.theme.sizes.textLarge};
    font-weight: bold;
  }

  .card-content {
    flex: 1;
  }
`;
