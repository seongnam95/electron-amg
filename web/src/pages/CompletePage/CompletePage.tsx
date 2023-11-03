import Lottie from "lottie-react";
import completeLottie from "@lotties/complete.json";
import { useRecoilValue } from "recoil";
import { formatDate } from "@utils/formatDate";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { DocumentView } from "@com/view";
import { CompletePageStyled } from "./styled";
import { draftState } from "~/stores/stores";

interface CompleteProps {
  contractorName: string;
}

function CompletePage({ contractorName }: CompleteProps) {
  const contractRef = useRef<HTMLDivElement>(null);
  const draft = useRecoilValue(draftState);

  // 계약서 저장 핸들러
  const handleSaveDocument = async () => {
    if (contractRef.current) {
      const doc = await html2canvas(contractRef.current, { useCORS: true });
      const base64doc = doc.toDataURL("image/jpeg", 1);
      const link = document.createElement("a");

      link.href = base64doc;
      link.download = `amg_contract_${formatDate(
        draft.startPeriod,
        false,
        true
      )}.jpeg`;
      link.click();

      document.body.removeChild(link);
    }
  };

  return (
    <CompletePageStyled>
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
            <p>수수료</p>
          </div>

          <div className="info-text">
            <p>{contractorName}</p>
            <p>
              {formatDate(draft.startPeriod, true)} ~{" "}
              {formatDate(draft.endPeriod, true)}
            </p>
            <p>{draft.unitPay.toLocaleString()}원</p>
          </div>
        </div>

        <button className="save-document-btn" onClick={handleSaveDocument}>
          계약서 저장하기
        </button>
      </div>
      <DocumentView className="document-view" viewRef={contractRef} />
    </CompletePageStyled>
  );
}

export default CompletePage;
