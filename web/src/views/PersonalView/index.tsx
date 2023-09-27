import { Field, useFormikContext } from "formik";
import { Input, NextButton, PastWorkerModal } from "@components";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Contractor, Worker } from "@types";
import { useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { getWorker } from "@api/worker";

/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
export function PersonalView() {
  const isValidForm = useValidFormCheck();
  const { values } = useFormikContext<Contractor>();

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  const [worker, setWorker] = useState<Worker | undefined>();

  const setStep = useSetRecoilState(stepState);
  const setContractor = useSetRecoilState(ContractorState);

  useEffect(() => {
    if (isValidForm) getWorkerList();
  }, [isValidForm]);

  // 기존 근로자 API 호출
  const getWorkerList = () => {
    const name = values.name;
    const ssn = values.idFront + values.idBack;

    getWorker(name, ssn)
      .then((res) => {
        const data = res.data.result;
        setWorker(serviceWorker(data));
      })
      .catch(() => {});
  };

  // Worker 데이터 변환
  const serviceWorker = (data: any): Worker => {
    const worker: Worker = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      residence: data.residence,
      bank: data.bank,
      bankNumCover: data.bank_num_cover,
      bankBook: data.bank_book,
      idCard: data.id_card,
    } as Worker;
    return worker;
  };

  // TODO 새로운 계약서 작성하더라도 중복 Worker 처리
  const saveContractor = () => {};

  // 이전 기록으로 계약 진행
  const handleClickSkip = () => {
    if (worker) {
      setContractor({
        id: worker.id,
        name: worker.name,
        phone: worker.phone,
        residence: worker.residence,
      });
      setStep(3);
    }
  };

  const handleClickNew = () => {
    if (worker) {
      setContractor({
        id: worker.id,
        name: worker.name,
        phone: worker.phone,
        residence: worker.residence,
      });
      setStep(3);
    }
  };

  // 스킵 또는 기록 없음
  const handleNext = () => {
    setContractor((prev) => {
      return {
        ...prev,
        name: values.name,
        phone: values.phone,
      };
    });
    setStep(1);
  };

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
        onlyNum
        onCompleted={() => frontRef.current?.focus()}
      />

      {/* 주민등록번호 */}
      <div className="id-input-wrap">
        <Field
          as={Input}
          name="idFront"
          inputRef={frontRef}
          inputMode="tel"
          maxLength={6}
          placeholder="주민등록번호"
          onlyNum
          onCompleted={() => backRef.current?.focus()}
        />

        <Field
          as={Input}
          name="idBack"
          inputRef={backRef}
          inputMode="tel"
          maxLength={7}
          type="password"
          onlyNum
          onCompleted={() => backRef.current?.blur()}
        />
      </div>
      <NextButton className="next-btn" onClick={handleNext} />
      {worker && (
        <PastWorkerModal
          worker={worker}
          open={isValidForm}
          onNew={handleNext}
          onSkip={handleClickSkip}
        />
      )}
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

  .next-btn {
    margin-top: 3.4rem;
  }
`;
