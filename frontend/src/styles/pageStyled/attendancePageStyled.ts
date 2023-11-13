import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  height: 100%;
  overflow: hidden;

  .tracker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;

    height: 6.4rem;
    padding: 0 2rem;

    .ant-radio-group,
    .ant-picker {
      height: 3.2rem;
    }
  }

  .color-hint-wrap {
    display: flex;
    justify-content: right;
    gap: 1.6rem;
    padding: 0.4rem 2rem 0rem 0;

    > span {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 0.8rem;
      font-size: 1.2rem;
      color: ${p => p.theme.colors.textColor2};

      .color-bar {
        display: flex;

        height: 0.6rem;
        width: 2rem;
        border-radius: 0.2rem;
      }
    }
  }

  .table-wrap {
    height: calc(100% - 6.4rem);
    overflow: auto;
  }
`;
