import styled from 'styled-components';

export const UnitPayListStyled = styled.div`
  position: relative;
  height: 100%;

  .item-label {
    width: 7rem;
    color: ${p => p.theme.colors.textColor1};
    font-size: ${p => p.theme.sizes.textMedium};
  }

  .item-unit {
    width: 8rem;
    font-size: ${p => p.theme.sizes.textSmall};
    color: ${p => p.theme.colors.textColor2};

    text-align: center;
  }

  .item-total {
    text-align: end;
    width: 10rem;
    color: ${p => p.theme.colors.textColor2};
    font-size: ${p => p.theme.sizes.textSmall};
  }

  .total-wrap {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: ${p => p.theme.colors.contentBG};
    padding: 1.6rem 0 0.2rem;
    border-top: 1px solid ${p => p.theme.colors.borderColor};

    .total-sum {
      font-size: 18px;
      line-height: 20px;
      font-weight: bold;
      color: #f27373;
    }
  }
`;
