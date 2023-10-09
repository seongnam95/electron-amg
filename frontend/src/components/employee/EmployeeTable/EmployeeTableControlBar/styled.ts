import styled from 'styled-components';

export const StyledEmployeeTableControlBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  padding: 0 2rem;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};

  > .control-wrap {
    display: flex;
    align-items: center;
    gap: 2.4rem;

    > .tool-wrap {
      display: flex;
      gap: 0.4rem;
    }
  }
`;
