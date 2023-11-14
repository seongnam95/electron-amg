import styled from 'styled-components';

export const DayTableFooterStyled = styled.div`
  position: fixed;
  bottom: 0;

  width: 100%;
  height: 12rem;

  border-top: 1px solid ${p => p.theme.colors.borderColor};
  background-color: rgba(255, 255, 255, 0.5);
  /* background-color: ${p => p.theme.colors.contentBG}; */
  z-index: 9999;
`;
