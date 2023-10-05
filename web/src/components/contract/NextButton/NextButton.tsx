import { AnimatePresence, motion } from "framer-motion";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { ButtonHTMLAttributes, useEffect } from "react";
import { NextButtonStyled } from "./styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ContractState, ContractorState, stepState } from "~/stores/contract";
import { MouseEvent } from "react";
import { useFormikContext } from "formik";
import { FormValueType } from "@type/contract";

interface NexButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  lastStep: number;
}

function NextButton({ lastStep, onClick, ...props }: NexButtonProps) {
  const isValidForm = useValidFormCheck();

  const { handleSubmit, values } = useFormikContext<FormValueType>();
  const [step, setStep] = useRecoilState(stepState);
  const setContract = useSetRecoilState(ContractState);
  const setContractor = useSetRecoilState(ContractorState);

  useEffect(() => {
    if (step === 3) {
      setContract((prev) => {
        return {
          ...prev,
          signBase64: values.signBase64,
        };
      });
    } else if (step === 1) {
      setContractor((prev) => {
        return {
          ...prev,
          name: values.name,
          phone: values.phone,
          residence: values.residence,
        };
      });
    }
  }, [values]);

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    if (step < lastStep) {
      window.scrollTo({ top: 0 });
      setStep(step + 1);
    } else if (step === lastStep) handleSubmit();
    onClick?.(e);
  };

  return (
    <AnimatePresence>
      {isValidForm && (
        <motion.div
          style={{ marginTop: "4rem" }}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <NextButtonStyled
            type={props.type ? props.type : "button"}
            onClick={handleNext}
            {...props}
          >
            다음
          </NextButtonStyled>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NextButton;
