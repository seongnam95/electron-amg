import { Field, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores/contract";
import useValidFormCheck from "@hooks/useValidFormCheck";
import { getWorker } from "@apis/worker";
import { PersonalViewStyled } from "./styled";
import { ContractorType, WorkerType } from "@type/contract";
import { Input } from "@com/common";
import { NextButton, WorkerSkipModal } from "@com/contract";
import { HTMLAttributes } from "react";

/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
interface PersonalViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function PersonalView({ viewRef, ...props }: PersonalViewProps) {
  const isValidForm = useValidFormCheck();
  const { values } = useFormikContext<ContractorType>();

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);

  const [worker, setWorker] = useState<WorkerType | undefined>();

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
        const data = serviceWorker(res.data.result);
        setWorker(data);
        setContractor((prev) => {
          return {
            ...prev,
            id: data.id,
          };
        });
      })
      .catch(() => {});
  };

  // Worker 데이터 변환
  const serviceWorker = (data: any): WorkerType => {
    const worker: WorkerType = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      residence: data.residence,
      bank: data.bank,
      bankNumCover: data.bank_num_cover,
      bankBook: data.bank_book,
      idCard: data.id_card,
    } as WorkerType;
    return worker;
  };

  // 이전 기록으로 계약 진행
  const handleClickSkip = () => {
    if (worker) {
      setContractor((prev) => {
        return {
          ...prev,
          name: worker.name,
          phone: worker.phone,
          residence: worker.residence,
        };
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
    <PersonalViewStyled ref={viewRef} {...props}>
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
        <WorkerSkipModal
          worker={worker}
          open={isValidForm}
          onNew={handleNext}
          onSkip={handleClickSkip}
        />
      )}
    </PersonalViewStyled>
  );
}

export default PersonalView;
