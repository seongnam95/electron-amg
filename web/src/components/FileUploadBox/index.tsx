import styled from "styled-components";
import { Icon } from "@components";
import { useField, useFormikContext } from "formik";
import { ChangeEvent, useState, useEffect } from "react";
import imageCompression from "browser-image-compression";

interface FileUploadBoxProps {
  name: string;
  label?: string;
}

export function FileUploadBox({ name, label }: FileUploadBoxProps) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => setPreview(field.value), [field.value]);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 0.2, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then((result) => {
          setPreview(result);
        });

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64data = reader.result;
          setFieldValue(name, base64data);
        };
      } catch (err) {
        alert(`이미지 파일 업로드 중 오류가 발생했습니다.\nErr:${err}`);
      }
    }
  };

  return (
    <StyledUploadBox preview={preview ? true : false}>
      <input
        {...field}
        value=""
        type="file"
        accept="image/*"
        onChange={handleOnChange}
      />
      {preview ? (
        <img className="preview-img" src={preview.toString()} alt="preview" />
      ) : null}
      <div className="upload-hint">
        <Icon icon="uploadOutline" size="3.4rem" />
        <span>{label}</span>
      </div>
    </StyledUploadBox>
  );
}

const StyledUploadBox = styled.label<{ preview: boolean }>`
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
