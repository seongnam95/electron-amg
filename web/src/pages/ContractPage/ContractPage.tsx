import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik, FormikProvider } from "formik";
import { useRecoilState } from "recoil";

import { ContractorType } from "@type/contract";
import {
  ContractState,
  ContractorState,
  initContractor,
  stepState,
} from "@stores/contract";
import { fetchContractDraft } from "@apis/draft";
import { createWorker, updateWorker } from "@apis/worker";
import { createContract } from "@apis/contract";

import { STEPS } from "./contractSteps";
import { Header } from "@com/layout";
import { ContractPageStyled } from "./styled";

const ContractPage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [viewSize, setViewSize] = useState<string>("");
  const [contract, setContract] = useRecoilState(ContractState);
  const [Contractor, setContractor] = useRecoilState(ContractorState);
  const navigate = useNavigate();

  // console.log("랜더링");

  const [step, setStep] = useRecoilState(stepState);
  const currentStep = STEPS[step];
  if (!currentStep) throw new Error(`Undefined step: ${step}`);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const { id } = useParams();
  // useEffect(() => {
  //   if (!id) return;
  //   let isMounted = true;

  //   setContractor(initContractor);
  //   fetchContractDraft(id)
  //     .then((data) => {
  //       const contract = data.result;
  //       setContract(contract);
  //     })
  //     .catch(() => {
  //       if (!isMounted) return;

  //       // navigate("/");
  //       // alert("유효하지 않은 폼입니다.");
  //     });

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [id]);

  const initValues: ContractorType = {
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

  const handleSubmit = (values: ContractorType) => {
    completeDraw();
    if (Contractor.id) {
      updateWorker(Contractor.id, values).then((res) => {
        const id = res.data.result.id;
        createContract(id, contract).then((res) => {
          if (res.data.success) completeDraw();
        });
      });
    } else {
      createWorker(values).then((res) => {
        const id = res.data.result.id;
        createContract(id, contract).then((res) => {
          if (res.data.success) completeDraw();
        });
      });
    }
  };

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: currentStep.validationSchema,
    onSubmit: handleSubmit,
  });

  const completeDraw = () => {
    navigate("/complete");
    formik.resetForm();
    setStep(0);
  };

  return (
    <ContractPageStyled>
      <div style={{ position: "absolute", top: 0, fontSize: "14px" }}>
        {viewSize}
      </div>
      <Header height="12rem" {...StepHeaders[step]} />
      <FormikProvider key={step} value={formik}>
        <motion.div
          key={step}
          className="content-wrap"
          style={{ height: "100%" }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <currentStep.viewComponent viewRef={divRef} />
        </motion.div>
      </FormikProvider>
    </ContractPageStyled>
  );
};

export default ContractPage;
