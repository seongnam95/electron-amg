import styled from 'styled-components';

export const WorkerTrackerPageStyled = styled.div`
  .year-month {
    font-size: ${p => p.theme.sizes.iconLazy};
    font-weight: bold;

    .ant-picker {
      .ant-picker-input {
      }
    }

    > span:first-child {
      color: ${p => p.theme.colors.textColor2};
      margin-right: 1rem;
    }

    > span:nth-last-child() {
      color: ${p => p.theme.colors.textColor1};
      margin-right: 1.8rem;
    }
  }
`;
