import { AnimatePresence, motion } from "framer-motion";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { ButtonHTMLAttributes } from "react";
import { NextButtonStyled } from "./styled";
import { useRecoilState } from "recoil";
import { MouseEvent } from "react";
import { useFormikContext } from "formik";
import { FormValueType } from "~/types/types";
import { stepState } from "~/stores/stores";

interface NexButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  lastStep: number;
}

function NextButton({ lastStep, onClick, ...props }: NexButtonProps) {
  const isValidForm = useValidFormCheck();

  const { handleSubmit } = useFormikContext<FormValueType>();
  const [step, setStep] = useRecoilState(stepState);

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
