import styled from "styled-components";
import { BottomSheetModal } from "../BottomSheetModal";
import { InputHTMLAttributes, useState } from "react";
import { Input } from "@components";

interface PositionSelector extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: () => void;
}

export function PositionSelector({
  onSelected,
  onChange,
  ...rest
}: PositionSelector) {
  const positions = [
    { value: "1", label: "팀장" },
    { value: "2", label: "부팀장" },
    { value: "3", label: "알바" },
    { value: "4", label: "기사" },
    { value: "5", label: "홍보단" },
    { value: "6", label: "기타" },
  ];
  const currentLabel = positions.find((pos) => pos.value === rest.value)?.label;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({
        target: {
          value: selectedValue,
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onSelected?.();
    setShowModal(false);
  };

  return (
    <PositionSelectorStyled>
      <Input
        readOnly
        {...rest}
        value={currentLabel || ""}
        onFocus={() => setShowModal(true)}
      />
      <BottomSheetModal
        open={showModal}
        height="60%"
        title="직위 선택"
        onClose={() => setShowModal(false)}
      >
        <ul>
          {positions.map((pos) => (
            <PositionListItem
              key={pos.value}
              active={rest.value === pos.value}
              onClick={() => handleSelect(pos.value)}
            >
              {pos.label}
            </PositionListItem>
          ))}
        </ul>
      </BottomSheetModal>
    </PositionSelectorStyled>
  );
}

const PositionSelectorStyled = styled.div`
  ul {
    overflow-y: scroll;
  }
`;

const PositionListItem = styled.ul<{ active?: boolean }>`
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: var(--font-size-l);
  height: 5.6rem;
  padding: 0 1.2rem;
  font-weight: ${(p) => (p.active ? "bold" : "normal")};
  cursor: pointer;
`;
