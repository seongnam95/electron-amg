import styled from 'styled-components';

export const MonthTable2Styled = styled.div`
  white-space: nowrap;

  .table-row {
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};
  }

  .table-cell {
    position: relative;
    border-right: 1px solid ${p => p.theme.colors.borderColor};
    box-sizing: content-box;
    font-weight: normal;
    padding: 1.8rem 1.4rem 1.6rem;
    color: rgb(118, 118, 118);
    font-size: ${p => p.theme.sizes.textSmall};

    &.first-cell {
      line-height: 1.4rem;
      font-weight: bold;
      color: ${p => p.theme.colors.textColor1};
    }

    .attendance-bar {
      position: absolute;
      left: 5px;

      height: 30%;

      border-radius: 3px;
      z-index: 10;

      &.attendance {
        top: 5px;
        background-color: ${p => p.theme.colors.primary};
      }

      &.incentive {
        top: calc(30% + 7px);
        background-color: ${p => p.theme.colors.secondary};
      }

      &.deduct {
        top: 100%;
        background-color: ${p => p.theme.colors.error};
      }
    }
  }
`;
