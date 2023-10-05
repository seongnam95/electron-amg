import { ContractClause, ContractorInfoTable } from "@com/contract";
import { DocumentViewStyled } from "./styled";
import { HTMLAttributes } from "react";

interface DocumentViewProps extends HTMLAttributes<HTMLDivElement> {
  viewRef?: React.RefObject<HTMLDivElement>;
}

function DocumentView({ viewRef, ...props }: DocumentViewProps) {
  return (
    <DocumentViewStyled ref={viewRef} {...props}>
      <div className="contract-wrap">
        <div className="contract-title">용역 계약서</div>
        <div className="contract-content">
          <ContractClause printView />
          <ContractorInfoTable printView />
        </div>
      </div>
    </DocumentViewStyled>
  );
}

export default DocumentView;
