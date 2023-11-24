import styled from 'styled-components';

export const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${p => p.theme.sizes.headerHeight};
  min-height: ${p => p.theme.sizes.headerHeight};
  padding: 0.6rem 2rem 0;
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};
`;
