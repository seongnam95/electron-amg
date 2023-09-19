import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Modal, Input, BottomSheetModal } from "@components";
import DaumPostcode, { Address } from "react-daum-postcode";
import { useField, useFormikContext } from "formik";

interface AddressInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: () => void;
}

export function AddressInput({
  onSelected,
  onChange,
  ...rest
}: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);

  const handleOnComplete = (address: Address) => {
    if (onChange) {
      onChange({
        target: {
          value: address.address,
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onSelected?.();
    setShowAddressModal(false);
  };

  return (
    <StyledAddressInput>
      <Input
        readOnly
        inputRef={inputRef}
        onFocus={() => setShowAddressModal(true)}
        {...rest}
      />

      <BottomSheetModal
        title="은행 선택"
        open={showAddressModal}
        onClose={() => setShowAddressModal(false)}
      >
        <DaumPostcode
          animation
          style={{ height: "100%" }}
          onComplete={handleOnComplete}
        />
      </BottomSheetModal>
    </StyledAddressInput>
  );
}

const StyledAddressInput = styled.div`
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
