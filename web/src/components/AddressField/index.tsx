import { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Input } from "@components";
import DaumPostcode, { Address } from "react-daum-postcode";
import { useField, useFormikContext } from "formik";

interface AddressFieldProps {
  name: string;
  label?: string;
}

export function AddressField({ name, label }: AddressFieldProps) {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);

  const handleOnComplete = (result: Address) => {
    setShowAddressModal(false);
    setFieldValue(name, result.address);
  };

  useEffect(() => {
    if (showAddressModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showAddressModal]);

  return (
    <StyledAddressField>
      <span className="field-label">{label}</span>
      <Input
        {...field}
        readOnly
        type="text"
        placeholder="( 주소입력 )"
        onClick={() => setShowAddressModal(true)}
      />

      {showAddressModal ? (
        <Modal
          title="주소 검색"
          showModal={showAddressModal}
          onClose={() => setShowAddressModal(false)}
        >
          <DaumPostcode
            animation
            style={{ height: "100%" }}
            onComplete={handleOnComplete}
          />
        </Modal>
      ) : null}
    </StyledAddressField>
  );
}

const StyledAddressField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .post-modal {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
  }

  .field-label {
    font-size: var(--font-size-xs);
    font-weight: bold;
    color: var(--text);
    padding-left: 0.4rem;
  }
`;
