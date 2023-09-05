import styled from 'styled-components';

export const StyledWorkerTableControlBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.4rem;
  padding: 0 1.4rem;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  > .section {
    position: absolute;
    right: 1.4rem;
    display: flex;
    gap: 0.4rem;
  }
`;
