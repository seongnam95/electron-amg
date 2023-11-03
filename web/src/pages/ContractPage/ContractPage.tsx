import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik, FormikProvider } from "formik";
import { useRecoilState, useSetRecoilState } from "recoil";

import { CreateEmployeeBody, createEmployee } from "@apis/employee";

import { STEPS, StepHeaders } from "./contractSteps";
import { ContractPageStyled } from "./styled";
import { NextButton } from "~/components/contract";
import { Empty } from "antd";
import { fetchDraft } from "~/apis/draft";
import { contractorState, draftState, stepState } from "~/stores/stores";
import { FormValueType } from "~/types/types";
import { Header } from "~/components/common";

const ContractPage = () => {
  const navigate = useNavigate();

  const divRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useRecoilState(draftState);
  const [step, setStep] = useRecoilState(stepState);
  const setContractor = useSetRecoilState(contractorState);

  const currentStep = STEPS[step];
  const lastStep = STEPS.length - 1;

  if (!currentStep)
    return (
      <Empty
        description="잘못 된 접근입니다."
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );

  // 폼 조회 후, Recoil State에 저장
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    fetchDraft(id)
      .then((data) => setDraft(data.result))
      .catch(() => {
        if (!isMounted) return;

        navigate("/");
        alert("유효하지 않은 폼입니다.");
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // 스탭 변경 때 마다 스크롤 맨 위로
  useEffect(() => window.scrollTo({ top: 0 }), [step]);

  // 서브밋
  const handleSubmit = (values: FormValueType) => {
    const ssn = `${values.idFront}${values.idBack}`;
    const body: CreateEmployeeBody = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      startPeriod: draft.startPeriod,
      endPeriod: draft.endPeriod,
      bank: values.bank,
      bankNum: values.bankNum,
      ssn: ssn,
      bankBook: values.bankBook,
      idCard: values.idCard,
      signBase64: values.signBase64,
      positionId: draft.positionId,
    };

    createEmployee({ teamId: draft.teamId, body: body }).then(() => {
      setContractor({
        name: values.name,
        address: values.address,
        phone: values.phone,
        signBase64: values.signBase64,
      });
      resetDraft();
      navigate("/complete");
    });
  };

  const resetDraft = () => {
    formik.resetForm();
    setStep(0);
  };

  const formik = useFormik({
    initialValues: currentStep.initialValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <ContractPageStyled>
      <Header height="12rem" {...StepHeaders[step]} />
      <FormikProvider key={step} value={formik}>
        <motion.div
          key={step}
          className="content-wrap"
          style={{ height: "100%" }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <currentStep.viewComponent viewRef={divRef} />
          <NextButton className="next-btn" lastStep={lastStep} />
        </motion.div>
      </FormikProvider>
    </ContractPageStyled>
  );
};

export default ContractPage;
