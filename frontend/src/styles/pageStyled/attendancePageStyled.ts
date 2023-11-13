import styled from 'styled-components';

export const AttendancePageStyled = styled.div`
  height: 100%;
  overflow: hidden;

  .AttendanceTable {
    height: calc(100% - ${p => p.theme.sizes.headerHeight});
  }
`;
