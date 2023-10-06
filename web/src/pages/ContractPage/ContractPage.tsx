import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik, FormikProvider } from "formik";
import { useRecoilState } from "recoil";

import { FormValueType } from "@type/contract";
import {
  ContractState,
  ContractorState,
  initContractor,
  stepState,
} from "@stores/contract";
import { fetchContractDraft } from "@apis/draft";
import { createWorker, updateWorker } from "@apis/employee";
import { createContract } from "@apis/contract";

import { STEPS } from "./contractSteps";
import { Header } from "@com/layout";
import { ContractPageStyled } from "./styled";
import { NextButton } from "~/components/contract";
import { Empty } from "antd";

const ContractPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [contract, setContract] = useRecoilState(ContractState);
  const [Contractor, setContractor] = useRecoilState(ContractorState);
  const navigate = useNavigate();

  const [step, setStep] = useRecoilState(stepState);
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

  useEffect(() => window.scrollTo({ top: 0 }), [step]);

  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    setContractor(initContractor);
    fetchContractDraft(id)
      .then((data) => {
        const contract = data.result;
        setContract(contract);
      })
      .catch(() => {
        if (!isMounted) return;

        // navigate("/");
        // alert("유효하지 않은 폼입니다.");
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

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

  const handleSubmit = (values: FormValueType) => {
    const { contractConsent, personalConsent, signBase64, ...rest } = values;
    // TODO : 테스트 후 completeDraw(); 삭제
    // completeDraw();

    //  기존 계약정보가 존재할 경우
    if (Contractor.id) {
      updateWorker(Contractor.id, rest).then((res) => {
        const id = res.data.result.id;
        createContract(id, contract).then((res) => {
          if (res.data.success) completeDraw();
        });
      });
    } else {
      createWorker(rest).then((res) => {
        const id = res.data.result.id;
        createContract(id, contract).then((res) => {
          if (res.data.success) completeDraw();
        });
      });
    }
  };

  const completeDraw = () => {
    navigate("/complete");
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
