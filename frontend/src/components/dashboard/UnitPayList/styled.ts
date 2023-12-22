import styled from 'styled-components';

export const UnitPayListStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .unit-list {
    height: 100%;
    overflow: auto;
  }

  .unit-name {
    width: 7rem;
    color: ${p => p.theme.colors.textColor1};
    font-size: ${p => p.theme.sizes.textMedium};
  }

  .unit-pay {
    width: 8rem;
    font-size: ${p => p.theme.sizes.textSmall};
    color: ${p => p.theme.colors.textColor2};

    text-align: center;
  }

  .unit-total-pay {
    text-align: end;
    width: 10rem;
    color: ${p => p.theme.colors.textColor2};
    font-size: ${p => p.theme.sizes.textSmall};
  }

  .total-sum-footer {
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
