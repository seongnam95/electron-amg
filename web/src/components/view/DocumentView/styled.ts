import styled from "styled-components";

export const DocumentViewStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21cm;
  height: 29.7cm;
  padding: 1cm 0.6cm 1cm 0.6cm;
  font-family: "NanumMyeongjo";

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }

  .contract-wrap {
    border: 1px solid ${(p) => p.theme.colors.textColor1};

    .contract-title {
      font-size: ${(p) => p.theme.sizes.textLazy};
      font-weight: bold;
      text-align: center;
      padding: 0.7rem 0 0.5rem 0;
      border-bottom: 1px solid ${(p) => p.theme.colors.textColor1};
    }

    .contract-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem 1rem;
    }
  }
`;
