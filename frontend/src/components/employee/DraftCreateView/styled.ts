import styled from 'styled-components';

export const DraftCreateViewStyled = styled.div`
  .result-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 2.8rem 2rem 1.8rem;
    border-radius: 0.6rem;
    background-color: ${p => p.theme.colors.innerBg};
  }
`;
