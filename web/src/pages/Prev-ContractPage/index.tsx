import { useRef } from "react";

import { useRecoilState } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { useNavigate } from "react-router-dom";
import { DocumentPage } from "../DocumentPage";
import styled from "styled-components";
import html2canvas from "html2canvas";

export function ContractPage() {
  const docRef = useRef<HTMLDivElement>(null);

  const [contractor, setContractor] = useRecoilState(ContractorState);
  const [contract, setContract] = useRecoilState(ContractState);

  const handleOnSubmit = async () => {
    try {
      const doc = await html2canvas(docRef.current as HTMLElement);
      const base64doc = doc.toDataURL("image/jpeg", 0.8).split(",")[1];
      const salaryText =
        contract.salary === "daily"
          ? "일당"
          : contract.salary === "weekly"
          ? "주급"
          : "월급";

      const body = {
        doc: base64doc,
        name: contractor.name,
        phone: contractor.phone,
        address: contractor.residence,
        bank: contractor.bank,
        bankNum: contractor.bankNum,
        identification: contractor.identification,
        bankbook: contractor.bankbook,
        sign: contractor.sign,
        salary: salaryText,
        pay: contract.defaultWage.toString(),
        startPeriod: contract.startPeriod,
        endPeriod: contract.endPeriod,
      };

      console.log(body);

      // axios
      //   .post("http://amgcom.site/api/contract", body)
      //   .then(() => {
      //     setIsLoading(false);
      //     navigate("/complete");
      //   })
      //   .catch((error) => {
      //     alert(
      //       `계약서 전송 실패. 잠시후 다시 시도해주세요.\n\nError: ${error}`
      //     );
      //     setIsLoading(false);
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledContractPage>
      <DocumentPage inputRef={docRef} className="doc-page" />
    </StyledContractPage>
  );
}

const StyledContractPage = styled.div`
  background-color: white;

  .doc-page {
    position: absolute;
    left: -300rem;
    top: -20rem;
    z-index: -9999;
  }
`;
