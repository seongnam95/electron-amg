import { Field, useFormikContext } from "formik";
import { Input } from "@components";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { WorkerData } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores";

interface Personal {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;
}
/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
export function PersonalView() {
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  const [worker, setWorker] = useState<WorkerData | undefined>();
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const setContractor = useSetRecoilState(ContractorState);
  const setStep = useSetRecoilState(stepState);

  const textWorker: WorkerData = {
    id: "1",
    name: "장성남",
    phone: "01012341234",
    residence: "경기도 남양주시 다산동",
  };

  const { isValid, dirty, values, errors, validateForm } =
    useFormikContext<Personal>();

  useEffect(() => {
    console.log(errors);
    const validateFormCheck = async () => {
      const errors = await validateForm();
      if (isValid && dirty && !Object.keys(errors).length)
        setWorker(textWorker);
      else setIsValidForm(false);
    };
    validateFormCheck();
  }, [values, errors]);

  // 기존 근로자 API 호출
  const getWorkerList = () => {
    const params = {
      name: values.name,
      phone: values.phone,
      birth: values.idFront,
    };

    axios
      .get("http://localhost:8001/api/v1/worker/draw/", { params })
      .then((res) => {
        const data: WorkerData = res.data.result;
        setWorker(data);
        setIsValidForm(true);
      })
      .catch((err) => alert(err));
  };

  // 이전 기록으로 계약 진행
  const handleClickSkip = () => {
    if (worker) {
      setContractor((preview) => {
        return {
          ...preview,
          name: worker.name,
          phone: worker.phone,
          address: worker.residence,
        };
      });
      setStep(3);
    }
  };

  return (
    <PersonalViewStyled>
      {worker ? (
        <AnimatePresence>
          <motion.div
            onAnimationComplete={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="btn-wrap"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="card-btn"
              onClick={handleClickSkip}
            >
              <p className="btn-label">이전 계약 정보로 진행하기</p>
            </button>
            <button
              type="button"
              className="card-btn link"
              onClick={() => setStep(1)}
            >
              <p className="btn-label">새로운 정보로 진행하기</p>
            </button>
          </motion.div>
        </AnimatePresence>
      ) : (
        isValidForm && <>sadasd</>
      )}

      {/* 이름 */}
      <Field as={Input} name="name" placeholder="계약자 성명" />

      {/* 연락처 */}
      <Field
        as={Input}
        name="phone"
        inputMode="numeric"
        maxLength={11}
        placeholder="연락처"
        hint="'-' 하이픈 제외 숫자만 입력"
        onlyNum
        onCompleted={() => frontRef.current?.focus()}
      />

      {/* 주민등록번호 */}
      <div className="id-input-wrap">
        <Field
          as={Input}
          name="idFront"
          inputRef={frontRef}
          inputMode="numeric"
          maxLength={6}
          placeholder="주민등록번호"
          onlyNum
          onCompleted={() => backRef.current?.focus()}
        />

        <Field
          as={Input}
          name="idBack"
          inputRef={backRef}
          inputMode="numeric"
          maxLength={7}
          type="password"
          onlyNum
          onCompleted={() => backRef.current?.blur()}
        />
      </div>
    </PersonalViewStyled>
  );
}

const PersonalViewStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  .id-input-wrap {
    display: flex;
    gap: 1.4rem;
  }
`;
