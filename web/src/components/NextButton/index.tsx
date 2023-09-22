import { Button } from "@components";
import { AnimatePresence, motion } from "framer-motion";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { ButtonHTMLAttributes, MouseEvent } from "react";
import { useFormikContext } from "formik";
import { Contractor } from "@types";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores";

export const NextButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const isValidForm = useValidFormCheck();
  const { values } = useFormikContext<Contractor>();
  const setContractor = useSetRecoilState(ContractorState);
  const [step, setStep] = useRecoilState(stepState);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(values);
    setContractor(values);
    setStep(step + 1);
  };

  return (
    <AnimatePresence>
      {isValidForm && (
        <motion.div
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
          <Button
            type={props.type ? props.type : "button"}
            onClick={handleClick}
            {...props}
          >
            다음
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
