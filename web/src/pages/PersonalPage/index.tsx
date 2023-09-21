import { Header } from "@components";
import { PersonalPageStyled } from "./styled";

import { useFormik, FormikProvider } from "formik";
import { motion } from "framer-motion";
import { STEPS } from "./steps";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContractState, stepState } from "@stores";
import { useParams } from "react-router-dom";
import { Salary } from "@types";
import { useEffect, useMemo } from "react";

// URL : http://localhost:5173/draw/d2Vla2x5LDM1MDAwMCwyMzA5MTgsMjMwOTMw

const PersonalPage = () => {
  const setContract = useSetRecoilState(ContractState);
  const step = useRecoilValue(stepState);
  const currentStep = STEPS[step];
  if (!currentStep) throw new Error(`Undefined step: ${step}`);

  const { params } = useParams();
  useEffect(() => {
    if (params) {
      let decData = atob(params);
      if (decData)
        setContract((prev) => {
          return {
            ...prev,
            salary: decData.split(",")[0] as Salary,
            pay: decData.split(",")[1],
            startPeriod: `20${decData.split(",")[2]}`,
            endPeriod: `20${decData.split(",")[3]}`,
          };
        });
    }
  }, [params]);

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

  const StepHeaders = useMemo(
    () => [
      {
        title: "AMG 계약서 작성",
        subTitle: (
          <>
            계약자(수급인) 정보를 정확히 입력해주세요. <br />
            올바르지 않은 정보 입력은 <br />
            계약 진행에 불이익을 초래할 수 있습니다.
          </>
        ),
      },
      {
        title: "AMG 계약서 작성",
        subTitle: (
          <>
            계약자(수급인) 정보를 정확히 입력해주세요. <br />
            올바르지 않은 정보 입력은 <br />
            계약 진행에 불이익을 초래할 수 있습니다.
          </>
        ),
      },
      {
        title: "신분증 및 통장사본 첨부",
        subTitle: (
          <>
            계약자(수급인)의 신분증과 통장 사본을 첨부해주세요.
            <br />
            본인 명의의 통장 또는 계좌번호가 아닐 경우
            <br />
            관리자에게 문의해주세요.
          </>
        ),
      },
      {
        title: "계약 조항",
        subTitle: (
          <>
            모든 계약 조항을 꼼꼼히 읽은 후,
            <br />
            계약에 동의한다면 아래 서명란에 서명해 주세요.
          </>
        ),
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: () => {},
  });

  return (
    <PersonalPageStyled>
      <Header {...StepHeaders[step]} />
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
