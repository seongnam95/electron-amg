import styled from 'styled-components';

export const ExcelDrawerModalStyled = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 2.4rem;
  border-radius: 0.8rem;
  background-color: ${p => p.theme.colors.contentBG};
  z-index: 9999;
`;

export const BackDropMask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  background-color: rgba(66, 66, 66, 0.3);
  z-index: 9998;
`;

export const ColumnSelector = styled.div``;
