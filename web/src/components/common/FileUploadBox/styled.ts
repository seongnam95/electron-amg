import styled from "styled-components";

export const UploadBoxStyled = styled.label<{ preview: boolean }>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 20rem;
  border: 2px dashed ${(p) => p.theme.colors.borderColor};
  border-radius: 1.2rem;

  overflow: hidden;
  cursor: pointer;

  > input {
    display: none;
  }

  .preview-img {
    position: relative;
    width: 100%;
    object-fit: cover;
  }

  .upload-hint {
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    width: 100%;
    height: 100%;
    background-color: ${(p) =>
      p.preview ? " rgba(0, 0, 0, 0.4)" : "transparent"};

    > span {
      font-size: ${(p) => p.theme.sizes.textSmall};
      color: ${(p) => (p.preview ? "white" : p.theme.colors.textColor3)};
    }

    .upload-icon {
      font-size: 2.2rem;
      color: ${(p) =>
        p.preview ? "white" : p.theme.colors.textColor3} !important;
    }
  }
`;
