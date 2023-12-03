import styled from 'styled-components';

export const DashboardPageStyled = styled.div`
  overflow: auto;

  height: 100%;
  padding: 2rem;
  background-color: ${p => p.theme.colors.innerBg};

  > div:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
