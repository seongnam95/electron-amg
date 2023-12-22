import styled from 'styled-components';

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  border-radius: 1.2rem;
  background-color: ${p => p.theme.colors.contentBG};
  box-shadow: rgba(160, 160, 160, 0.2) 0 8px 32px;

  .card-header {
    .card-title {
      width: 100%;
      display: flex;
      gap: 1.2rem;
      align-items: center;
      font-size: ${p => p.theme.sizes.textLarge};
      font-weight: bold;
      padding: 3rem 2.4rem 0;
    }
  }

  .card-content {
    flex: 1;
    overflow: hidden;
    padding: 0 3rem 3rem;
  }
`;
