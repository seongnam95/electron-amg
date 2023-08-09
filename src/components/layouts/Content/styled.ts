import styled from 'styled-components';

export const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background-color: ${props => props.theme.colors.contentBG};

  > .content {
    flex: 1;
    overflow: hidden;

    > div {
      height: 100%;
    }
  }
`;
