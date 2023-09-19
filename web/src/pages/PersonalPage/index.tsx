import { Header } from "@components";
import { PersonalPageStyled } from "./styled";

import { useFormik, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { STEPS } from "./steps";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContractState, stepState } from "@stores";
import { useParams } from "react-router-dom";
import { Salary } from "@types";
import { useEffect } from "react";

// URL : http://localhost:5173/draw/d2Vla2x5LDM1MDAwMCwyMzA5MTgsMjMwOTMw

const PersonalPage = () => {
  const setContract = useSetRecoilState(ContractState);

  const step = useRecoilValue(stepState);
  const currentStep = STEPS[step];

  const { params } = useParams();

  useEffect(() => {
    if (params) {
      let decData = atob(params);

      if (decData)
        setContract((prev) => {
          return {
            ...prev,
            salary: decData.split(",")[0] as Salary,
            pay: Number(decData.split(",")[1]),
            startPeriod: `20${decData.split(",")[2]}`,
            endPeriod: `20${decData.split(",")[3]}`,
          };
        });
    }
  }, [params]);

  if (!currentStep) {
    throw new Error(`Undefined step: ${step}`);
  }

  const initValues = {
    name: "",
    phone: "",
    idFront: "",
    idBack: "",
    address: "",
    bank: "",
    bankNum: "",
    identification: "",
    bankbook: "",
    sign: "",
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: () => {},
  });

  return (
    <PersonalPageStyled>
      <Header />
      <FormikProvider key={step} value={formik}>
        <motion.div
          key={step}
          style={{ height: "100%" }}
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
