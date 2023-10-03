import { ContractArticle, ContractorInfoTable } from "@com/contract";
import { DocumentViewStyled } from "./styled";

interface DocumentPageProps {
  className?: string;
  inputRef?: React.RefObject<HTMLDivElement>;
}

function DocumentView({ className, inputRef }: DocumentPageProps) {
  return (
    <DocumentViewStyled className={className} ref={inputRef}>
      <div className="contract-wrap">
        <div className="contract-title">용역 계약서</div>
        <div className="contract-content">
          <ContractArticle printView />
          <ContractorInfoTable printView />
        </div>
      </div>
    </DocumentViewStyled>
  );
}

export default DocumentView;
