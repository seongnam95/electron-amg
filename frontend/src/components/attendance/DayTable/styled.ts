import styled from 'styled-components';

export const DayTableStyled = styled.div`
  position: relative;

  .ant-table-cell {
    &.first-cell {
      border-right: 1px solid ${p => p.theme.colors.borderColor};
    }

    &.last-cell {
      border-left: 1px solid ${p => p.theme.colors.borderColor};
    }
  }

  .AttendanceEditForm {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
