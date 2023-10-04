import styled from "styled-components";

export const PersonalConsentStyled = styled.div`
  div {
    margin-bottom: 4rem;
  }

  section {
    padding: 0.4rem 0.8rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: ${(p) => p.theme.sizes.textLazy};
    font-weight: bold;
    margin-bottom: 2rem;
    line-height: 120%;
  }

  h2 {
    font-size: ${(p) => p.theme.sizes.textMedium};
    font-weight: bold;
    margin-bottom: 0.6rem;
  }

  p {
    font-size: ${(p) => p.theme.sizes.textMedium};
    line-height: 130%;
    margin-bottom: 0.4rem;
  }

  .accent-text {
    color: #7c32cf;
  }
`;
