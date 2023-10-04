import styled from "styled-components";

export const SelectorStyled = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;

  .down-arrow-icon {
    z-index: -1;
    position: absolute;
    right: 0.6rem;
    bottom: 0.7rem;
    color: ${(p) => p.theme.colors.textColor2};
  }

  ul {
    overflow-y: scroll;
  }
`;
