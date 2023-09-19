import styled from "styled-components";
import { BankIcon, Icon, Input } from "@components";
import { AnimatePresence, motion } from "framer-motion";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { banks } from "./banks";

export const BankSelector = ({
  onChange,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);

  const handleBankSelect = (selectedValue: string) => {
    if (onChange) {
      onChange({
        target: {
          value: selectedValue,
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    setShowBankModal(false);
  };

  return (
    <BankSelectorStyled>
      <Input
        readOnly
        inputRef={inputRef}
        onFocus={() => setShowBankModal(true)}
        {...rest}
      />
      <BankModal
        open={showBankModal}
        onClose={() => setShowBankModal(false)}
        onSelect={handleBankSelect}
      />
    </BankSelectorStyled>
  );
};

interface BankModalProps {
  open?: boolean;
  onClose: () => void;
  onSelect: (v: string) => void;
}

const BankModal = ({ open = false, onClose, onSelect }: BankModalProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <BankModalStyled>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mask-wrap"
            onClick={onClose}
          />
          <motion.div
            className="bank-modal-wrap"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="modal-header">
              은행 선택
              <Icon icon="closeOutline" onClick={onClose} />
            </div>
            <div className="bank-list">
              {banks.map((bank) => (
                <div
                  key={bank.value}
                  className="bank-item"
                  onClick={() => onSelect(bank.name)}
                >
                  <BankIcon bank={bank.value} />
                  {bank.name}
                </div>
              ))}
            </div>
          </motion.div>
        </BankModalStyled>
      )}
    </AnimatePresence>,
    document.body
  );
};

const BankModalStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;

  .mask-wrap {
    width: 100vw;
    height: 100vh;
    background-color: rgba(50, 50, 50, 0.4);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: var(--text);
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 3rem;
  }

  .bank-modal-wrap {
    position: absolute;
    bottom: 0;

    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;

    width: 100%;
    height: 90%;
    padding: 4rem 2rem;

    background-color: white;

    .bank-list {
      display: flex;
      align-content: flex-start;
      height: calc(100% - 40px);
      flex-wrap: wrap;
      gap: 1rem 1.2rem;
      padding-bottom: 10rem;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .bank-item {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 31%;
      height: 9rem;
      padding: 1.4rem 0 1rem;
      border-radius: 1.2rem;
      background-color: rgb(250, 250, 250);

      color: var(--text);
      font-size: var(--font-size-s);
      white-space: nowrap;

      cursor: pointer;
    }
  }
`;
const BankSelectorStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  .bank-btn-wrap {
    height: 4rem;

    .bank-btn {
      font-size: var(--font-size-2xs);
      color: var(--text);

      height: 3.2rem;
      padding: 0 1.2rem;
      background-color: transparent;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }
  }
`;
