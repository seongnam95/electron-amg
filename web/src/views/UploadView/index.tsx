import { FileUploadBox, NextButton } from "@components";
import { stepState } from "@stores";
import { Field } from "formik";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export function UploadView() {
  const setStep = useSetRecoilState(stepState);

  return (
    <StyledUploadView>
      <Field as={FileUploadBox} name="identification" label="신분증 첨부" />
      <Field as={FileUploadBox} name="bankbook" label="통장사본 첨부" />
      <NextButton onClick={() => setStep(3)} />
    </StyledUploadView>
  );
}

// styled
const StyledUploadView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;
