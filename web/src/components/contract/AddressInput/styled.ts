import styled from "styled-components";

export const AddressInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .post-modal {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
  }

  .field-label {
    font-size: ${(p) => p.theme.sizes.textSmall};
    font-weight: bold;
    color: ${(p) => p.theme.colors.textColor1};
    padding-left: 0.4rem;
  }
`;
