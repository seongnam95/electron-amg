import { fetchAllContractDraft } from "@apis/draft";
import { formatDate } from "@utils/formatDate";
import { Empty } from "antd";
import { useQuery } from "react-query";
import { FormHistoryViewStyled } from "./styled";
import { POSITION_CODE, SALARY_CODE } from "@type/contract";

interface FormHistoryViewProps {
  onCopy: (formId: string) => void;
}

function FormHistoryView({ onCopy }: FormHistoryViewProps) {
  const { data } = useQuery(["draft"], fetchAllContractDraft());

  return (
    <FormHistoryViewStyled>
      {data ? (
        data
          .slice()
          .reverse()
          .map((data) => {
            return (
              <div
                className="draft-item"
                key={data.id}
                onClick={() => onCopy(data.id)}
              >
                <div className="row header">
                  <span className="group-name-text">{data.groupName}</span>
                  <span className="id-chip">{data.id}</span>
                </div>
                <section>
                  <div className="row">
                    <span className="label-text">직위</span>
                    <span>
                      <b>{POSITION_CODE[data.positionCode]}</b>
                    </span>
                  </div>

                  <div className="row">
                    <span className="label-text">
                      {SALARY_CODE[data.salary]}
                    </span>
                    <span className="wage">
                      {Number(data.defaultWage).toLocaleString()}원
                    </span>
                  </div>

                  <div className="row">
                    <span className="label-text">계약 기간</span>
                    <span>
                      {formatDate(data.startPeriod, true)} ~{" "}
                      {formatDate(data.endPeriod, true)}
                    </span>
                  </div>
                </section>
              </div>
            );
          })
      ) : (
        <Empty description="기록 없음" />
      )}
    </FormHistoryViewStyled>
  );
}

export default FormHistoryView;
