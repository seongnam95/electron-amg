import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useFormik, FormikProvider } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";

import { Header } from "@components";
import { Contractor } from "@types";
import { ContractState, ContractorState, stepState } from "@stores";
import { fetchContractDraft } from "@api/draft";
import { createWorker } from "@api/worker";
import { createContract } from "@api/contract";

import { STEPS } from "./steps";

export const ContractPage = () => {
  const [contract, setContract] = useRecoilState(ContractState);
  const Contractor = useRecoilValue(ContractorState);
  const navigate = useNavigate();

  const step = useRecoilValue(stepState);
  const currentStep = STEPS[step];
  if (!currentStep) throw new Error(`Undefined step: ${step}`);

  const { params } = useParams();
  useEffect(() => {
    if (!params) return;
    let isMounted = true;

    fetchContractDraft(params)
      .then((data) => {
        const contract = data.result;
        setContract(contract);
      })
      .catch(() => {
        if (!isMounted) return;

        navigate("/");
        alert("유효하지 않은 폼입니다.");
      });

    return () => {
      isMounted = false;
    };
  }, [params]);

  const initValues: Contractor = {
    name: "",
    phone: "",
    idFront: "",
    idBack: "",
    residence: "",
    bank: "",
    bankNum: "",
    idCard: "",
    bankBook: "",
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

  const handleSubmit = (values: Contractor) => {
    if (Contractor.id) {
      console.log("아이디 있음", values);
    } else {
      createWorker(values).then((res) => {
        const id = res.data.result.id;
        createContract(id, contract).then((res) => {
          if (res.data.success) handleCompleted();
        });
      });
    }
  };

  const handleCompleted = () => {};

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => console.log(formik.values), [formik.values]);

  return (
    <ContractPageStyled>
      <Header height="12rem" {...StepHeaders[step]} />
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
    </ContractPageStyled>
  );
};

const ContractPageStyled = styled.div`
  padding: 3.4rem 2rem 11.8rem;
  height: 100%;
`;
