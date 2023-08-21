import styled from 'styled-components';

export const LoginPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;

  height: 100%;
  padding-bottom: 5rem;

  .title {
    font-size: 3rem;
    font-weight: bold;
    color: ${p => p.theme.colors.primary};
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30%;

    > .Button {
      margin-top: 2rem;
    }
  }
`;
