import { Field, useFormikContext } from "formik";
import { Input } from "@components";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import axios from "axios";
import { WorkerData } from "@types";
import { AnimatePresence, motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { stepState } from "@stores";

interface Personal {
  name: string;
  phone: string;
  idFront: string;
  idBack: string;
}

export function PersonalView() {
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  const setStep = useSetRecoilState(stepState);
  const { isValid, dirty, errors, values } = useFormikContext<Personal>();

  const handleClickPrev = () => {
    setStep(3);
  };

  useEffect(() => {
    console.log(isValid, dirty);
    if (isValid && dirty) console.log("완");
  }, [isValid, dirty, errors]);

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
        const data: WorkerData[] = res.data.result;
        console.log(data);
      });
  };

  const handleBlurPhone = () => {};

  return (
    <PersonalViewStyled>
      {/* 이름 */}
      <Field as={Input} name="name" placeholder="계약자 성명" />

      {/* 연락처 */}
      <Field
        as={Input}
        name="phone"
        inputMode="tel"
        maxLength={11}
        placeholder="연락처"
        hint="'-' 하이픈 제외 숫자만 입력"
        onBlur={handleBlurPhone}
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
          onCompleted={() => backRef.current?.focus()}
        />

        <Field
          as={Input}
          name="idBack"
          inputRef={backRef}
          inputMode="numeric"
          maxLength={7}
          type="password"
          onCompleted={() => backRef.current?.blur()}
        />
      </div>

      {isValid && dirty ? (
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
              onClick={handleClickPrev}
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
      ) : null}
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
