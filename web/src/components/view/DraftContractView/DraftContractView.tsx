import { Field, Form, Formik } from "formik";
import { getDefaultDate } from "./utils";
import { createContractDraft } from "@apis/draft";
import { useMutation, useQueryClient } from "react-query";
import { DraftContractViewStyled } from "./styled";
import { ContractType } from "@type/contract";
import { Button, Input, Selector } from "@com/common";

interface DraftContractViewProps {
  onCopy: (formId: string) => void;
}

function DraftContractView({ onCopy }: DraftContractViewProps) {
  const queryClient = useQueryClient();
  const { today, endOfMonth } = getDefaultDate();
  const { mutate } = useMutation(["draft"], createContractDraft());

  const positionItems = [
    { value: "1", label: "팀장" },
    { value: "2", label: "부팀장" },
    { value: "3", label: "알바" },
    { value: "4", label: "기사" },
    { value: "5", label: "홍보단" },
    { value: "6", label: "기타" },
  ];

  const salaryItems = [
    { value: "daily", label: "일급" },
    { value: "weekly", label: "주급" },
    { value: "monthly", label: "월급" },
  ];

  const initValues: ContractType = {
    groupName: "",
    positionCode: "3",
    salary: "daily",
    defaultWage: "",
    startPeriod: today,
    endPeriod: endOfMonth,
  };

  const handleSubmit = (contract: ContractType) => {
    mutate(contract, {
      onSuccess: (data) => {
        onCopy(data.result.id);
        queryClient.invalidateQueries(["draft"]);
      },
    });
  };

  return (
    <DraftContractViewStyled>
      <Formik initialValues={initValues} onSubmit={handleSubmit}>
        {({ values }) => {
          const wageLabel =
            values.salary === "daily"
              ? "일급"
              : values.salary === "weekly"
              ? "주급"
              : "월급";

          return (
            <Form className="form-wrap">
              <Field as={Input} name="groupName" placeholder="그룹명" />

              <Field
                as={Selector}
                name="positionCode"
                modalTitle="직위 선택"
                items={positionItems}
                placeholder="직위 구분"
              />

              <section className="row-wrap">
                <Field
                  as={Selector}
                  name="salary"
                  modalTitle="급여 구분 선택"
                  items={salaryItems}
                  placeholder="급여 구분"
                  style={{ flex: "1" }}
                />
                <Field
                  as={Input}
                  name="defaultWage"
                  placeholder={`급여 (${wageLabel})`}
                  inputMode="numeric"
                  onlyNum
                  style={{ flex: "2" }}
                />
              </section>

              <section className="row-wrap">
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
              </section>

              <Button
                type="submit"
                className="create-btn"
                style={{ borderRadius: 0 }}
                disabled={!values.defaultWage}
              >
                클립보드에 링크 복사
              </Button>
            </Form>
          );
        }}
      </Formik>
    </DraftContractViewStyled>
  );
}

export default DraftContractView;
