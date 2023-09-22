import { FileUploadBox, NextButton } from "@components";
import { Field } from "formik";
import styled from "styled-components";

export function UploadView() {
  return (
    <StyledUploadView>
      <Field as={FileUploadBox} name="identification" label="신분증 첨부" />
      <Field as={FileUploadBox} name="bankbook" label="통장사본 첨부" />
      <NextButton />
    </StyledUploadView>
  );
}

// styled
const StyledUploadView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;
