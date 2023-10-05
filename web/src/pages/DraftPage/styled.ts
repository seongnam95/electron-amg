import styled from "styled-components";

export const DraftPageStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3.4rem 0;

  width: 100vw;
  height: 100%;

  .tab-bar-wrap {
    height: calc(100% - 5.6rem);
  }

  .link-text {
    position: absolute;
    top: -100%;
  }
`;
