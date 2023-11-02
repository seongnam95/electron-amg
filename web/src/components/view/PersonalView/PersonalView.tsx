import { Field, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import { fetchEmployee } from "@apis/employee";
import { PersonalViewStyled } from "./styled";
import { EmployeeType } from "@type/contract";
import { Input } from "@com/common";
import { AddressInput, EmployeeSkipModal } from "@com/contract";
import { HTMLAttributes } from "react";
import { stepState } from "~/stores/step";
import { FormValueType } from "~/pages/ContractPage/contractSteps";

/**
 * [ STEP 1 ] 개인정보 입력 폼
 */
interface PersonalViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function PersonalView({ viewRef, ...props }: PersonalViewProps) {
  const { values, errors, validateForm, setFieldValue } =
    useFormikContext<FormValueType>();
  const setStep = useSetRecoilState(stepState);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeType | undefined>();

  const nameRef = useRef<HTMLInputElement>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  useEffect(() => nameRef.current?.focus(), []);

  // 이름, 주민등록번호 입력 시
  useEffect(() => {
    const validateFormCheck = async () => {
      const { name, idFront, idBack } = await validateForm();
      if (!name && !idFront && !idBack) getEmployeeList();
    };

    validateFormCheck();
  }, [
    values.name,
    errors.name,
    values.idFront,
    errors.idFront,
    values.idBack,
    errors.idBack,
  ]);

  // 기존 근로자 API 호출
  const getEmployeeList = () => {
    if (nameRef.current && frontRef.current && backRef.current) {
      const name = nameRef.current.value;
      const ssn = frontRef.current.value + backRef.current.value;

      fetchEmployee(name, ssn)
        .then((employee) => {
          setEmployee(employee);
          setShowModal(true);
        })
        .catch(() => {});
    }
  };

  // 스킵 버튼 클릭 시
  const handleSkipInput = () => {
    if (!employee) return;

    setFieldValue("name", employee.name);
    setFieldValue("phone", employee.phone);
    setFieldValue("address", employee.address);

    setStep(3);
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
        name="address"
        placeholder="주소"
      />

      {employee && (
        <EmployeeSkipModal
          employee={employee}
          open={showModal}
          onClose={() => setShowModal(false)}
          onSkip={handleSkipInput}
        />
      )}
    </PersonalViewStyled>
  );
}

export default PersonalView;
