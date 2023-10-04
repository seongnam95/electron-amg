import { FileUploadBox } from "@com/common";
import { NextButton } from "@com/contract";
import { stepState } from "@stores/contract";
import { Field } from "formik";
import { HTMLAttributes } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface UploadViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function UploadView({ viewRef, ...props }: UploadViewProps) {
  const setStep = useSetRecoilState(stepState);

  return (
    <UploadViewStyled {...props}>
      <Field as={FileUploadBox} name="idCard" label="신분증 첨부" />
      <Field as={FileUploadBox} name="bankBook" label="통장사본 첨부" />
      <NextButton onClick={() => setStep(3)} />
    </UploadViewStyled>
  );
}

// styled
const UploadViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export default UploadView;
