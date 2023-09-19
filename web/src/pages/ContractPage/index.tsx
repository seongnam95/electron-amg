import { useState, useEffect, useRef } from "react";
import { ArticleView, UploadView, PersonalView } from "@views";
import { Form, Formik } from "formik";
import { Button, Loading, View } from "@components";
import axios from "axios";
import { useParams } from "react-router-dom";

import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { useNavigate } from "react-router-dom";
import { Contractor, Salary } from "@types";
import { DocumentPage } from "../DocumentPage";
import styled from "styled-components";
import html2canvas from "html2canvas";

export function ContractPage() {
  const navigate = useNavigate();

  const docRef = useRef<HTMLDivElement>(null);
  const { params } = useParams();
  const [step, setStep] = useState(0);
  const [contractor, setContractor] = useRecoilState(ContractorState);
  const [contract, setContract] = useRecoilState(ContractState);
  const [submit, setSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const STEPS = [
    {
      title: "AMG 용역 계약서 작성",
      component: PersonalView,
      initialValues: (contractor: Contractor) => ({
        name: contractor.name,
        phone: contractor.phone,
        address: contractor.address,
        bank: contractor.bank,
        bankNum: contractor.bankNum,
      }),
      validationSchema: Yup.object().shape({
        name: Yup.string()
          .min(2, "이름은 최소 2글자 이상이어야 합니다.")
          .max(14, "이름은 최대 14글자 이하여야 합니다.")
          .required("이름 입력은 필수입니다."),
        phone: Yup.string()
          .matches(
            /^(010)-?\d{4}-?\d{4}$/,
            "핸드폰 번호가 올바르게 입력되지 않았습니다."
          )
          .required("핸드폰 번호 입력은 필수입니다."),
        address: Yup.string().required("주소 입력은 필수입니다."),
        bank: Yup.string().required("은행 입력은 필수입니다."),
        bankNum: Yup.string().required("계좌번호 입력은 필수입니다."),
      }),
      contentText: (
        <>
          계약자(수급인) 정보를 정확히 입력해주세요. <br />
          올바르지 않은 정보 입력은 <br />
          계약 진행에 불이익을 초래할 수 있습니다.
        </>
      ),
    },
    {
      title: "신분증 및 통장사본 첨부",
      component: UploadView,
      initialValues: (contractor: Contractor) => ({
        identification: contractor.identification,
        bankbook: contractor.bankbook,
      }),
      validationSchema: Yup.object().shape({
        identification: Yup.string().required("신분증 이미지를 첨부해주세요."),
        bankbook: Yup.string().required("통장사본 이미지를 첨부해주세요."),
      }),
      contentText: (
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
      component: ArticleView,
      initialValues: (contractor: Contractor) => ({
        sign: contractor.sign,
      }),
      validationSchema: Yup.object().shape({
        sign: Yup.string().required("서명은 필수입니다."),
      }),
      contentText: (
        <>
          모든 계약 조항을 꼼꼼히 읽은 후,
          <br />
          계약에 동의한다면 아래 서명란에 서명해 주세요.
        </>
      ),
    },
  ];

  const currentStep = STEPS[step];

  if (!currentStep) {
    throw new Error(`Undefined step: ${step}`);
  }

  useEffect(() => {
    if (submit) {
      handleOnSubmit();
      setSubmit(false);
    }
  }, [contractor, submit]);

  const handleOnSubmit = async () => {
    try {
      const doc = await html2canvas(docRef.current as HTMLElement);
      const base64doc = doc.toDataURL("image/jpeg", 0.8).split(",")[1];
      const salaryText =
        contract.salary === "daily"
          ? "일당"
          : contract.salary === "weekly"
          ? "주급"
          : "월급";

      const body = {
        doc: base64doc,
        name: contractor.name,
        phone: contractor.phone,
        address: contractor.address,
        bank: contractor.bank,
        bankNum: contractor.bankNum,
        identification: contractor.identification,
        bankbook: contractor.bankbook,
        sign: contractor.sign,
        salary: salaryText,
        pay: contract.pay.toString(),
        startPeriod: contract.startPeriod,
        endPeriod: contract.endPeriod,
      };

      console.log(body);

      // axios
      //   .post("http://amgcom.site/api/contract", body)
      //   .then(() => {
      //     setIsLoading(false);
      //     navigate("/complete");
      //   })
      //   .catch((error) => {
      //     alert(
      //       `계약서 전송 실패. 잠시후 다시 시도해주세요.\n\nError: ${error}`
      //     );
      //     setIsLoading(false);
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params) {
      let decData = atob(params);
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

  return (
    <StyledContractPage>
      <View title={currentStep.title} text={currentStep.contentText}>
        <Formik
          enableReinitialize
          initialValues={currentStep.initialValues(contractor)}
          validationSchema={currentStep.validationSchema}
          onSubmit={(values) => {
            setContractor((prevContractor) => ({
              ...prevContractor,
              ...values,
            }));

            if (step < STEPS.length - 1) {
              setStep(step + 1);
            } else {
              setIsLoading(true);
              setSubmit(true);
            }
          }}
        >
          {({ dirty, isValid }) => {
            const isLastStep = step === STEPS.length - 1;

            return (
              <Form>
                <currentStep.component />
                <div className="btn-wrap">
                  <Button
                    fixed
                    fullWidth
                    disabled={!dirty || !isValid}
                    type="submit"
                    className="next-btn"
                  >
                    {isLastStep ? "제출" : "다음"}
                  </Button>
                </div>
                {isLoading ? <Loading /> : null}
              </Form>
            );
          }}
        </Formik>
      </View>
      <DocumentPage inputRef={docRef} className="doc-page" />
    </StyledContractPage>
  );
}

const StyledContractPage = styled.div`
  background-color: white;

  .doc-page {
    position: absolute;
    left: -300rem;
    top: -20rem;
    z-index: -9999;
  }
`;
