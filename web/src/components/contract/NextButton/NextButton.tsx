import { AnimatePresence, motion } from "framer-motion";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@com/common";

function NextButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const isValidForm = useValidFormCheck();

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
          <Button type={props.type ? props.type : "button"} {...props}>
            다음
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NextButton;
