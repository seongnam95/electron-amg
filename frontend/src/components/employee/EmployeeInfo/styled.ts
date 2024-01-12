import styled from 'styled-components';

export const EmployeeInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 10rem;

  .info-card {
    border-radius: 0.8rem;
    background-color: ${p => p.theme.colors.innerBg};
    padding: 2rem;
  }

  .btn-wrap {
    background-color: white;
    padding-top: 2rem;
    width: calc(100% - 4rem);
    left: 2rem;
    bottom: 0;
    position: absolute;
  }
`;
