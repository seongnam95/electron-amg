import styled from "styled-components";
import { BottomSheetModal } from "../BottomSheetModal";
import { InputHTMLAttributes, useState } from "react";
import { Icon, Input } from "@components";

interface ItemType {
  value: string;
  label: string;
}

interface Selector extends InputHTMLAttributes<HTMLInputElement> {
  items: Array<ItemType>;
  modalTitle: string;
  onSelected?: () => void;
}

export function Selector({
  items,
  modalTitle,
  onSelected,
  onChange,
  ...props
}: Selector) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentLabel = items.find((item) => item.value === props.value)?.label;

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({
        target: {
          value: selectedValue,
          name: props.name || "",
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
        {...props}
        value={currentLabel || ""}
        onFocus={() => setShowModal(true)}
      />
      <Icon className="down-arrow-icon" icon="downArrow" />
      <BottomSheetModal
        open={showModal}
        height="70%"
        title={modalTitle}
        onClose={() => setShowModal(false)}
      >
        <ul>
          {items.map((item) => (
            <ListItem
              key={item.value}
              active={props.value === item.value}
              onClick={() => handleSelect(item.value)}
            >
              {item.label}
            </ListItem>
          ))}
        </ul>
      </BottomSheetModal>
    </PositionSelectorStyled>
  );
}

const PositionSelectorStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;

  .down-arrow-icon {
    position: absolute;
    right: 0;
    bottom: 0.6rem;
  }

  ul {
    overflow-y: scroll;
  }
`;

const ListItem = styled.ul<{ active?: boolean }>`
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: var(--font-size-l);
  height: 5.6rem;
  padding: 0 1.2rem;
  font-weight: ${(p) => (p.active ? "bold" : "normal")};
  cursor: pointer;
`;
