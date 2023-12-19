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

export const PositionColorBox = styled.div<{ color?: string }>`
  width: 1.2rem;
  height: 1.4rem;
  border-radius: 0.3rem;
  background-color: ${p => p.color};
`;
