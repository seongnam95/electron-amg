import { fetchAllContractDraft } from "@api/draft";
import { POSITION_CODE, SALARY_CODE } from "@types";
import { formatDate } from "@utils/formatDate";
import { Empty } from "antd";
import { useQuery } from "react-query";
import styled from "styled-components";

interface FormHistoryViewProps {
  onCopy: (formId: string) => void;
}

export function FormHistoryView({ onCopy }: FormHistoryViewProps) {
  const { data } = useQuery(["draft"], fetchAllContractDraft());

  return (
    <StyledFormHistoryView>
      {data ? (
        data.map((data) => {
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
                  <span>{POSITION_CODE[data.positionCode]}</span>
                </div>

                <div className="row">
                  <span className="label-text">{SALARY_CODE[data.salary]}</span>
                  <span className="wage">
                    {Number(data.defaultWage).toLocaleString()}원
                  </span>
                </div>

                <div className="row">
                  <span className="label-text">계약 기간</span>
                  <span>
                    {formatDate(data.startPeriod)}~{formatDate(data.endPeriod)}
                  </span>
                </div>
              </section>
            </div>
          );
        })
      ) : (
        <Empty description="기록 없음" />
      )}
    </StyledFormHistoryView>
  );
}

const StyledFormHistoryView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  font-size: var(--font-size-m);
  color: var(--text);

  .draft-item {
    padding: 1.4rem;
    cursor: pointer;

    section {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      padding: 0.4rem;
      margin-top: 1.2rem;
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .group-name-text {
      font-weight: bold;
      font-size: var(--font-size-2xl);
    }

    .id-chip {
      color: var(--text-sub);
      border-radius: 4px;
      padding: 0.8rem 1.4rem;
      background-color: var(--inner-color);
    }

    .wage {
      font-weight: bold;
      color: var(--blue);
    }
  }
`;
