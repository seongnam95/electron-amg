import { Header } from "@components";
import { PersonalPageStyled } from "./styled";

import { useFormik, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { STEPS } from "./steps";
import { useRecoilValue } from "recoil";
import { stepState } from "@stores";

const PersonalPage = () => {
  const step = useRecoilValue(stepState);
  const currentStep = STEPS[step];

  if (!currentStep) {
    throw new Error(`Undefined step: ${step}`);
  }

  const formik = useFormik({
    initialValues: currentStep.initialValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: () => {},
  });

  return (
    <PersonalPageStyled>
      <Header />
      <FormikProvider value={formik}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <currentStep.viewComponent />
        </motion.div>
      </FormikProvider>
    </PersonalPageStyled>
  );
};

export default PersonalPage;
