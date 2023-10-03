import styled from "styled-components";

export const SelectorStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;

  .down-arrow-icon {
    position: absolute;
    right: 0;
    bottom: 0.6rem;
  }

  ul {
    overflow-y: scroll;
  }
`;
