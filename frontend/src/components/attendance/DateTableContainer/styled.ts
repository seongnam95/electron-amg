import styled from 'styled-components';

export const DateTableContainerStyled = styled.div`
  display: flex;
  width: 100%;

  .card-wrap {
    flex: 1 0 26rem;
    padding: 0.4rem 2.8rem 0;
  }

  .attendance-stats-card {
    position: absolute;
    right: 2rem;
    z-index: 1000;
  }
`;
