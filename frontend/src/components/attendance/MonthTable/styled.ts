import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  tr {
    border-bottom: 1px solid ${p => p.theme.colors.borderColor} !important;
  }

  .ant-table-cell {
    :not(:nth-last-child(2)):not(:first-child) {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }

    &.day {
      padding: 0 !important;

      &.saturday {
        font-weight: bold;
        color: ${p => p.theme.colors.blue};
        background-color: rgb(247, 250, 253, 0.8);
      }

      &.sunday {
        font-weight: bold;
        color: ${p => p.theme.colors.red};
        background-color: rgba(254, 249, 249, 0.8);
      }
    }

    &.amount-paid {
      position: sticky;
      right: 0;
      background-color: ${p => p.theme.colors.innerBg};
      border-left: 1px solid ${p => p.theme.colors.borderColor};
      z-index: 10;
    }
  }
`;

export const AttendanceBarStyled = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 0 0.4rem;

  z-index: 2;
  cursor: pointer;

  .attendance-bar {
    flex: 1;
    height: 1.8rem;

    border-radius: 4px;
    background-color: ${p => p.theme.colors.green};

    transition: all 140ms ease-in-out;
    opacity: 0.8;

    :hover {
      background-color: ${p => p.theme.colors.blue};
    }
  }
`;
