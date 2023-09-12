import { HTMLAttributes } from "react";
import styled from "styled-components";
import { Icon } from "@components";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  showModal?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function Modal({
  title,
  showModal = false,
  children,
  onClose,
  ...rest
}: ModalProps) {
  return (
    <StyledModal {...rest}>
      <div className="modal-header">
        <span className="modal-title">{title}</span>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <Icon icon="closeOutline" size="2.2rem" color="var(--text)" />
        </button>
      </div>
      <div className="modal-body">{children}</div>
    </StyledModal>
  );
}

// styled
const StyledModal = styled.div`
  z-index: 9999;

  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  background-color: white;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.6rem 0 2rem;

    height: 5.6rem;
    border-bottom: 1px solid var(--border-color);

    .modal-title {
      color: var(--text);
      font-size: var(--font-size-2xl);
      font-weight: bold;
    }

    .modal-close-btn {
      background-color: white;
      border: none;
      outline: none;

      width: 4rem;
      height: 4rem;
    }
  }

  .modal-body {
    height: calc(100% - 5.6rem);
  }
`;
