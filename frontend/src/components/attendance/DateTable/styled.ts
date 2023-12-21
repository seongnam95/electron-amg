import styled from 'styled-components';

export const DateTableStyled = styled.div`
  border: 1px solid ${p => p.theme.colors.borderColor};
  margin: 0 0 2rem 2rem;

  .ant-table-thead {
    position: sticky;
    top: 0;
    z-index: 11;
  }
`;
