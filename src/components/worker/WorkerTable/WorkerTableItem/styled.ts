import styled from 'styled-components';

export const WorkerListItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.8rem 2rem;

  color: ${p => p.theme.colors.textColor1};
  font-size: ${p => p.theme.sizes.textMedium};

  :hover {
    background-color: ${p => p.theme.colors.innerBg};
  }
`;
