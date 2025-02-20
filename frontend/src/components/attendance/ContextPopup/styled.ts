import styled from 'styled-components';

export const ContextPopupStyled = styled.div`
  position: relative;
  width: 100%;

  .popup-wrap {
    border-radius: 0.8rem;

    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(24px);

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

    .sub-title {
      padding: 0 2rem 0 2.4rem;
      color: ${p => p.theme.colors.textColor2};
      font-size: ${p => p.theme.sizes.textSmall};
    }

    .popup-content {
      padding: 0 3rem 2.4rem;
    }
  }
`;
