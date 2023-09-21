import { Button, FileUploadBox } from "@components";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { stepState } from "@stores";
import { Field } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export function UploadView() {
  const isValidForm = useValidFormCheck();
  const setStep = useSetRecoilState(stepState);

  return (
    <StyledUploadView>
      <Field as={FileUploadBox} name="identification" label="신분증 첨부" />
      <Field as={FileUploadBox} name="bankbook" label="통장사본 첨부" />

      <AnimatePresence>
        {isValidForm && (
          <motion.div
            className="btn-wrap"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button type="button" onClick={() => setStep(3)}>
              다음
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledUploadView>
  );
}

// styled
const StyledUploadView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  .btn-wrap {
    display: flex;
    width: 100%;
    margin-top: 3rem;

    > button {
      flex: 1;
    }
  }
`;
