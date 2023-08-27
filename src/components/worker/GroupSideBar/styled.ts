import styled from 'styled-components';

export const GroupSideBarStyled = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 24rem;

  padding: 1.8rem 1.8rem 3rem;
  border-right: 1px solid ${p => p.theme.colors.borderColor};

  > .menu-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
  }
`;
