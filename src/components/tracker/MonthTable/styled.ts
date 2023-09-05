import styled from 'styled-components';

export const MonthTableStyled = styled.div`
  --titleBg: #757575;

  font-size: ${p => p.theme.sizes.textSmall};
  white-space: nowrap;
  color: ${p => p.theme.colors.textColor1};

  overflow: auto;

  tr {
    height: 3.6rem;
    border-bottom: 1px solid ${p => p.theme.colors.borderColor};

    th,
    td {
      font-weight: normal;
      text-align: center;
      min-width: 3.6rem;
    }
  }

  tbody {
    tr:hover {
      background-color: ${p => p.theme.colors.innerBg};
    }

    td {
      cursor: pointer;
      :first-child {
        font-weight: bold;
      }
    }
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 2;
    font-weight: bold;
  }

  .name-column {
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1;
    padding: 0 1.4rem;
    border-right: 1px solid ${p => p.theme.colors.borderColor};
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
