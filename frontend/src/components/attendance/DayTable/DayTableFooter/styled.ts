import styled from 'styled-components';

export const DayTableFooterStyled = styled.div`
  position: fixed;
  bottom: 0;
  flex: 1;

  display: flex;
  gap: 3.4rem;
  justify-content: end;
  align-items: center;
  padding: 0 2.6rem;

  height: 9rem;
  width: calc(100% - ${p => p.theme.sizes.navBarWidth});

  border-top: 1px solid ${p => p.theme.colors.borderColor};
  background-color: rgba(252, 252, 252, 0.6);
  backdrop-filter: blur(18px);

  z-index: 10;
`;
