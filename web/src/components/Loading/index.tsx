import styled from "styled-components";
import Lottie from "lottie-react";
import LoadingLottie from "@lotties/loading.json";

export function Loading() {
  return (
    <StyledLoading>
      <Lottie animationData={LoadingLottie} className="loading-lottie" />
    </StyledLoading>
  );
}

// styled
const StyledLoading = styled.div`
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  .loading-lottie {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -70%);
  }
`;
