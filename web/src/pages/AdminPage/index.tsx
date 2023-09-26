import {
  Button,
  Header,
  Input,
  PositionSelector,
  SalaryRadio,
} from "@components";
import styled from "styled-components";
import { useRef } from "react";
import { Contract, Salary } from "@types";
import { Field, Form, Formik } from "formik";
import { getDefaultDate } from "./utils";
import { createContractForm } from "@api";

export type ContractForm = Pick<
  Contract,
  "salary" | "pay" | "startPeriod" | "endPeriod" | "groupName" | "positionCode"
>;

export function AdminPage() {
  const { today, endOfMonth } = getDefaultDate();
  const inputRef = useRef<HTMLInputElement>(null);

  const initValues: ContractForm = {
    groupName: "",
    positionCode: 0,
    salary: "daily",
    pay: "",
    startPeriod: today,
    endPeriod: endOfMonth,
  };

  const handleSubmit = (contract: ContractForm) => {
    createContractForm(contract).then((res) => {
      const id = res.data.result.id;

      if (inputRef.current) {
        inputRef.current.value = `http://amgcom.site/${id}`;
        handleOnCopy();
      }
    });
  };

  const handleOnCopy = async () => {
    try {
      const el = inputRef.current;
      el?.select();
      document.execCommand("copy");
      alert("클립보드에 복사되었습니다.");
    } catch (err) {
      alert(`클립보드 복사에 실패했습니다. \nErr: ${err}`);
    }
  };

  return (
    <StyledAdminPage>
      <Header
        title="계약서 폼 생성"
        subTitle={<>생성 된 링크를 계약자에게 전달해주세요.</>}
      />

      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          const payLabel =
            values.salary === "daily"
              ? "일급"
              : values.salary === "weekly"
              ? "주급"
              : "월급";

          return (
            <Form className="form-wrap">
              <SalaryRadio
                className="radio-btn"
                value={values.salary}
                onChange={(v: Salary) => {
                  handleChange({
                    target: {
                      name: "salary",
                      value: v,
                    },
                  });
                }}
              />
              <Field
                as={PositionSelector}
                name="positionCode"
                placeholder="직위 구분"
                inputMode="tel"
              />
              <Field
                as={Input}
                name="groupName"
                placeholder="협력 업체명"
                inputMode="tel"
              />
              <Field
                as={Input}
                name="pay"
                placeholder={`급여 (${payLabel})`}
                inputMode="tel"
                onlyNum
              />
              <Field
                as={Input}
                name="startPeriod"
                type="date"
                placeholder="시작일"
              />
              <Field
                as={Input}
                name="endPeriod"
                type="date"
                placeholder="종료일"
              />
              <Button type="submit" className="copy-btn" disabled={!values.pay}>
                클립보드에 링크 복사
              </Button>
            </Form>
          );
        }}
      </Formik>

      <input readOnly ref={inputRef} className="link-text" />
    </StyledAdminPage>
  );
}

const StyledAdminPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 3.4rem 2rem 11.8rem;

  width: 100vw;

  .form-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
  }

  .copy-btn {
    margin-top: 3.2rem;
  }

  .link-text {
    position: absolute;
    top: -100%;
  }
`;
