import styled from 'styled-components';

export const ContextPopupStyled = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1.2rem;

  border-radius: 0.8rem;
  background-color: ${p => p.theme.colors.contentBG};
  box-shadow: rgba(120, 120, 120, 0.2) 0 8px 32px;
  border: 1px solid ${p => p.theme.colors.borderColor};

  .popup-title {
    padding: 2.2rem 2rem 0 2.4rem;

    .title-wrap {
      font-weight: bold;
      font-size: ${p => p.theme.sizes.textLarge};
      margin-top: 0.3rem;
    }
  }

  .popup-content {
    padding: 0 3rem 2.4rem;
  }
`;
