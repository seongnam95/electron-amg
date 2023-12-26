import styled from 'styled-components';

export const MonthlyAttendanceTableStyled = styled.div`
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

export const HintText = styled.span`
  font-size: ${p => p.theme.sizes.textSmall};
  color: ${p => p.theme.colors.textColor3};
  margin-left: 3px;
  font-weight: normal;
  line-height: ${p => p.theme.sizes.textSmall};
  margin-top: 2px;
`;
