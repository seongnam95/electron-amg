import styled from 'styled-components';

export const MonthTableStyled = styled.table`
  font-size: ${p => p.theme.sizes.textSmall};
  white-space: nowrap;
  color: ${p => p.theme.colors.textColor1};

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(8px);
  }

  tr {
    height: 4rem;
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};

    th,
    td {
      font-weight: normal;
      text-align: center;
      min-width: 3.6rem;

      :first-child {
        position: sticky;
        left: 0;
        font-weight: bold;
        background-color: white;
        padding: 0 2rem;
        border-right: 1px solid ${p => p.theme.colors.borderColor};
      }
    }
  }

  /* .today {
    font-weight: bold;
    color: ${p => p.theme.colors.secondary};
    background-color: ${p => p.theme.colors.innerBg};
  } */

  .working-bullet {
    margin: auto;
    display: flex;
    height: 1.4rem;
    background-color: ${p => p.theme.colors.secondary};

    &.range-start {
      margin-left: 1.2rem;
      border-top-left-radius: 0.4rem;
      border-bottom-left-radius: 0.4rem;
    }

    &.range-end {
      margin-right: 1.2rem;
      border-top-right-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }
`;
