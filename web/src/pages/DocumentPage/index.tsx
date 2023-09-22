import { ContractArticle, Contractor } from "@components";
import { ContractState, ContractorState } from "@stores";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

interface DocumentPageProps {
  className?: string;
  inputRef?: React.RefObject<HTMLDivElement>;
}

export function DocumentPage({ className, inputRef }: DocumentPageProps) {
  const contract = useRecoilValue(ContractState);
  const contractor = useRecoilValue(ContractorState);

  return (
    <StyledDocumentPage className={className} ref={inputRef}>
      <div className="contract-wrap">
        <div className="contract-title">용역 계약서</div>
        <div className="contract-content">
          <ContractArticle
            printView
            salary={contract.salary}
            name={contractor.name}
            pay={contract.pay}
            startPeriod={contract.startPeriod}
            endPeriod={contract.endPeriod}
          />
          <Contractor
            printView
            repName={contract.repName}
            companyName={contract.companyName}
            companyAddress={contract.companyAddress}
            name={contractor.name}
            address={contractor.address}
            phone={contractor.phone}
            sign={contractor.sign}
          />
        </div>
      </div>
    </StyledDocumentPage>
  );
}

// styled
const StyledDocumentPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21cm;
  height: 29.7cm;
  padding: 1cm 0.6cm 1cm 0.6cm;
  font-family: "NanumMyeongjo";

  @page {
    size: A4;
    margin: 0;
  }

  @media print {
    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
    }
  }

  .contract-wrap {
    border: 1px solid var(--text);

    .contract-title {
      font-size: var(--font-size-xl);
      font-weight: bold;
      text-align: center;
      padding: 0.7rem 0 0.5rem 0;
      border-bottom: 1px solid var(--text);
    }

    .contract-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem 1rem;
    }
  }
`;
