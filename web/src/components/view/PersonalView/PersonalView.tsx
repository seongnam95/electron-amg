import { Field, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ContractorState, stepState } from "@stores/contract";
import { getWorker } from "@apis/employee";
import { PersonalViewStyled } from "./styled";
import { ContractorType, FormValueType, WorkerType } from "@type/contract";
import { Input } from "@com/common";
import { AddressInput, WorkerSkipModal } from "@com/contract";
import { HTMLAttributes } from "react";

/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
interface PersonalViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function PersonalView({ viewRef, ...props }: PersonalViewProps) {
  const { values, errors, validateForm } = useFormikContext<FormValueType>();
  const setStep = useSetRecoilState(stepState);
  const setContractor = useSetRecoilState(ContractorState);

  const [employee, setWorker] = useState<WorkerType | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => nameRef.current?.focus(), []);

  useEffect(() => {
    const validateFormCheck = async () => {
      const { name, idFront, idBack } = await validateForm();
      if (!name && !idFront && !idBack) getWorkerList();
    };

    validateFormCheck();
  }, [values, errors]);

  // 기존 근로자 API 호출
  const getWorkerList = async () => {
    if (nameRef.current && frontRef.current && backRef.current) {
      const name = nameRef.current.value;
      const ssn = frontRef.current.value + backRef.current.value;

      await getWorker(name, ssn)
        .then((res) => {
          const data = res.data.result;
          setWorker(data);
          setContractor((prev) => {
            return {
              ...prev,
              id: data.id,
            };
          });
          setShowModal(true);
        })
        .catch(() => {});
    }
  };

  return (
    <PersonalViewStyled ref={viewRef} {...props}>
      {/* 이름 */}
      <Field
        as={Input}
        inputRef={nameRef}
        name="name"
        placeholder="계약자 성명"
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
          onCompleted={() => phoneRef.current?.focus()}
        />
      </div>

      {/* 연락처 */}
      <Field
        as={Input}
        name="phone"
        inputRef={phoneRef}
        inputMode="tel"
        maxLength={11}
        placeholder="연락처"
        hint="'-' 하이픈 제외 숫자만 입력"
        onlyNum
        onCompleted={() => addressRef.current?.focus()}
      />

      {/* 주소 */}
      <Field
        as={AddressInput}
        inputRef={addressRef}
        name="residence"
        placeholder="주소"
      />

      {employee && (
        <WorkerSkipModal
          employee={employee}
          open={showModal}
          onClose={() => setShowModal(false)}
          onSkip={() => setStep(3)}
        />
      )}
    </PersonalViewStyled>
  );
}

export default PersonalView;
