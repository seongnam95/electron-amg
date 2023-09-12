import styled from "styled-components";
import { ContractArticle, Modal, Signature } from "@components";
import { useRecoilValue } from "recoil";
import { ContractState, ContractorState } from "@stores";
import { SignatureView } from "@views";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

export function ArticleView() {
  const contract = useRecoilValue(ContractState);
  const contractor = useRecoilValue(ContractorState);
  const [showSignModal, setShowSignModal] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext();
  const [sign, setSign] = useState<string>("");

  useEffect(() => {
    if (showSignModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showSignModal]);

  return (
    <StyledArticleView>
      <ContractArticle
        salary={contract.salary}
        name={contractor.name}
        pay={contract.pay}
        startPeriod={contract.startPeriod}
        endPeriod={contract.endPeriod}
      />
      <Signature
        repName={contract.repName}
        companyName={contract.companyName}
        companyAddress={contract.companyAddress}
        name={contractor.name}
        address={contractor.address}
        phone={contractor.phone}
        sign={sign === "" ? contractor.sign : sign}
        onClickSign={() => setShowSignModal(true)}
      />
      {showSignModal ? (
        <Modal
          title="서명"
          showModal={showSignModal}
          onClose={() => setShowSignModal(false)}
        >
          <SignatureView
            onSubmit={(result) => {
              setSign(result);
              setFieldValue("sign", result);
            }}
            onClose={() => setShowSignModal(false)}
          />
        </Modal>
      ) : null}
    </StyledArticleView>
  );
}

// styled
const StyledArticleView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;
