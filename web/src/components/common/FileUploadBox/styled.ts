import styled from "styled-components";

export const UploadBoxStyled = styled.label<{ preview: boolean }>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 20rem;
  border: 2px dashed var(--border-color);
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
    gap: 0.8rem;

    width: 100%;
    height: 100%;
    background-color: ${(p) =>
      p.preview ? " rgba(0, 0, 0, 0.4)" : "transparent"};

    > span {
      font-size: var(--font-size-s);
      color: ${(p) => (p.preview ? "white" : "var(--text-hint);")};
    }

    svg {
      fill: ${(p) => (p.preview ? "white" : "var(--text-hint);")} !important;
    }
  }
`;
