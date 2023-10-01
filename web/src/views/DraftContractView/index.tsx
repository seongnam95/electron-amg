import { Button, Input, PositionSelector, SalaryRadio } from "@components";
import { Contract, Salary } from "@types";
import { Field, Form, Formik } from "formik";
import styled from "styled-components";
import { getDefaultDate } from "./utils";
import { createContractDraft } from "@api/draft";

interface DraftContractViewProps {
  onCopy: (formId: string) => void;
}

export function DraftContractView({ onCopy }: DraftContractViewProps) {
  const { today, endOfMonth } = getDefaultDate();

  const initValues: Contract = {
    groupName: "",
    positionCode: 2,
    salary: "daily",
    defaultWage: "",
    startPeriod: today,
    endPeriod: endOfMonth,
  };

  const handleSubmit = (contract: Contract) => {
    createContractDraft(contract).then((data) => onCopy(data.result.id));
  };

  return (
    <StyledDraftContractView>
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => {
          const wageLabel =
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
              <Field as={Input} name="groupName" placeholder="협력 업체명" />
              <Field
                as={Input}
                name="defaultWage"
                placeholder={`급여 (${wageLabel})`}
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
              <Button
                type="submit"
                className="copy-btn"
                disabled={!values.defaultWage}
              >
                클립보드에 링크 복사
              </Button>
            </Form>
          );
        }}
      </Formik>
    </StyledDraftContractView>
  );
}

const StyledDraftContractView = styled.div`
  .form-wrap {
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
  }

  .copy-btn {
    margin-top: 3.2rem;
  }
`;
