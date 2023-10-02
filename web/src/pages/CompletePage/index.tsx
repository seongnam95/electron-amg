import styled from "styled-components";
import Lottie from "lottie-react";
import completeLottie from "@lotties/complete.json";
import { useRecoilValue } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { formatDate } from "@utils/formatDate";
import { useEffect, useRef } from "react";
import { DocumentPage } from "@pages";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

export function CompletePage() {
  const navigate = useNavigate();
  const contractRef = useRef<HTMLDivElement>(null);
  const contract = useRecoilValue(ContractState);
  const contractor = useRecoilValue(ContractorState);

  const salaryText =
    contract.salary === "daily"
      ? "일당"
      : contract.salary === "weekly"
      ? "주급"
      : "월급";

  useEffect(() => {
    if (!contractor.name) {
      navigate(-1);
    }
  }, []);

  const handleSaveDocument = async () => {
    if (contractRef.current) {
      const doc = await html2canvas(contractRef.current, { useCORS: true });
      const base64doc = doc.toDataURL("image/jpeg", 1);
      const link = document.createElement("a");

      link.href = base64doc;
      link.download = `amg_contract_${formatDate(
        contract.startPeriod,
        false,
        true
      )}.jpeg`;
      link.click();

      document.body.removeChild(link);
    }
  };

  return (
    <StyledCompletePage>
      <div className="complete-card">
        <div className="card-text-wrap">
          <Lottie
            loop={false}
            className="complete-icon"
            animationData={completeLottie}
          />
          <p className="card-title">계약서 작성완료</p>
          <p className="card-text">
            작성한 계약서는 담당자에게 전송되며
            <br />
            실물 계약서 필요 시 <br />
            담당자에게 문의 바랍니다.
          </p>
        </div>

        <div className="info-wrap">
          <div className="info-label">
            <p>계약자</p>
            <p>계약기간</p>
            <p>수수료 ({salaryText})</p>
          </div>

          <div className="info-text">
            <p>{contractor.name}</p>
            <p>
              {formatDate(contract.startPeriod, true)} ~{" "}
              {formatDate(contract.endPeriod, true)}
            </p>
            <p>{contract.defaultWage.toLocaleString()}원</p>
          </div>
        </div>

        <button className="save-document-btn" onClick={handleSaveDocument}>
          계약서 저장하기
        </button>
      </div>
      <DocumentPage className="document-page" inputRef={contractRef} />
    </StyledCompletePage>
  );
}

const StyledCompletePage = styled.div`
  position: relative;

  width: 100vw;
  height: 100%;
  background-color: var(--inner-color);

  .complete-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    width: 80%;
    justify-content: center;
    align-items: center;

    background-color: white;
    padding: 3rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow-gray-100);

    .card-text-wrap {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      align-items: center;

      .card-title {
        flex: 1;
        font-size: var(--font-size-2xl);
        font-weight: bold;
        color: var(--text);
      }

      .card-text {
        text-align: center;
        font-size: var(--font-size-m);
        color: var(--text-sub);
        line-height: 1.6rem;
      }
    }

    .complete-icon {
      width: 8.2rem;
      margin-bottom: 1rem;
    }
  }

  .info-wrap {
    display: flex;
    gap: 2.4rem;
    padding: 1.4rem 1rem;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    width: 100%;

    .info-label {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: var(--text);
      font-size: var(--font-size-xs);
      font-weight: bold;
    }

    .info-text {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      color: var(--text);
      font-size: var(--font-size-xs);
    }
  }

  .save-document-btn {
    border: none;
    outline: none;

    font-size: var(--font-size-l);
    color: white;

    width: 100%;
    background-color: var(--primary);
    padding: 1.6rem 0 1.4rem;
    border-radius: 50rem;
    box-shadow: var(--shadow-gray-100);
  }

  .document-page {
    position: absolute;
    bottom: 100%;
  }
`;
