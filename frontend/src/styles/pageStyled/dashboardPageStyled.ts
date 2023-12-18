import styled from 'styled-components';

export const DashboardPageStyled = styled.div`
  overflow: auto;
  display: flex;

  height: 100%;
  padding: 2.4rem;
  background-color: ${p => p.theme.colors.innerBg};

  .card-wrap {
    width: 100%;
    max-width: 124rem;
  }
`;
