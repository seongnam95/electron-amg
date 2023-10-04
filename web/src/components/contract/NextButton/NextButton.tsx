import { AnimatePresence, motion } from "framer-motion";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { ButtonHTMLAttributes } from "react";
import { NextButtonStyled } from "./styled";

function NextButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const isValidForm = useValidFormCheck();

  return (
    <AnimatePresence>
      {isValidForm && (
        <motion.div>
          <NextButtonStyled
            type={props.type ? props.type : "button"}
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
