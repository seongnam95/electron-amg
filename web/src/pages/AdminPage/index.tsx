import { Button, Header, Icon, Input, View } from "@components";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Contract, Salary } from "@types";
import { Field, Form, Formik } from "formik";
import { encodingData, getDefaultDate } from "./utils";

export type ContractBodyType = Pick<
  Contract,
  "salary" | "pay" | "startPeriod" | "endPeriod"
>;

export function AdminPage() {
  const { today, endOfMonth } = getDefaultDate();
  const inputRef = useRef<HTMLInputElement>(null);

  // const payLabel =
  //   contract.salary === "daily"
  //     ? "용역 수수료 (일급)"
  //     : contract.salary === "weekly"
  //     ? "용역 수수료 (주급)"
  //     : "용역 수수료 (월급)";

  const salaryTypes = [
    {
      label: "일급",
      value: "daily",
    },
    {
      label: "주급",
      value: "weekly",
    },
    {
      label: "월급",
      value: "monthly",
    },
  ];

  const handleSubmit = (contract: ContractBodyType) => {
    if (inputRef.current)
      inputRef.current.value = `http://amgcom.site/${encodingData(contract)}`;
    handleOnCopy();
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
      <Header />
      {/* <div className="radio-wrap">
        {salaryTypes.map((salary) => (
          <label key={salary.value}>
            <input
              type="radio"
              onChange={() => {
                setContract((prev) => {
                  return {
                    ...prev,
                    salary: salary.value as Salary,
                  };
                });
              }}
              checked={salary.value === contract.salary}
            />
            <span>{salary.label}</span>
          </label>
        ))}
      </div> */}

      <Formik
        initialValues={{
          salary: "daily",
          pay: "",
          startPeriod: today,
          endPeriod: endOfMonth,
        }}
        onSubmit={handleSubmit}
      >
        {({}) => (
          <Form className="form-wrap">
            <Field
              as={Input}
              name="pay"
              placeholder="급여"
              inputMode="numeric"
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
            <Button type="submit" className="copy-btn">
              클립보드에 링크 복사
            </Button>
          </Form>
        )}
      </Formik>

      <input readOnly ref={inputRef} className="link-text" />
    </StyledAdminPage>
  );
}

// styled
const StyledAdminPage = styled.div`
  position: relative;
  padding: 3.4rem 2rem 11.8rem;

  width: 100vw;
  height: 100vh;

  .form-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
  }

  .link-text {
    position: absolute;
    top: 100%;
  }

  .radio-wrap {
    display: flex;
    height: 4.6rem;
    width: 100%;
    border: 1px solid var(--border-color);

    > label {
      flex: 1;
      font-size: var(--font-size-m);
      height: 100%;

      cursor: pointer;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      input[type="radio"] {
        display: none;

        &:checked + span {
          color: white;
          background-color: var(--primary);
        }
      }
    }

    label:not(:last-child) {
      border-right: 1px solid var(--border-color);
    }
  }
`;
