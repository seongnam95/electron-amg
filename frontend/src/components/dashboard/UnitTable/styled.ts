import styled from 'styled-components';

export const UnitTableStyled = styled.div`
  .item-label {
    width: 6rem;
    color: ${p => p.theme.colors.textColor1};
    font-size: ${p => p.theme.sizes.textMedium};
  }

  .item-unit {
    width: 6.2rem;
    font-size: ${p => p.theme.sizes.textSmall};
    color: ${p => p.theme.colors.textColor2};

    text-align: center;
  }

  .item-total {
    width: 10rem;
    color: ${p => p.theme.colors.textColor3};
    font-size: ${p => p.theme.sizes.textSmall};

    > b {
      color: #f27373;
      margin-right: 0.2rem;
      font-size: ${p => p.theme.sizes.textMedium};
    }
  }
`;
