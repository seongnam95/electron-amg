import { InputHTMLAttributes, ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

import { InputButtonStyled } from './styled';

export interface InputButtonProps {
  color?: string;
  children?: ReactNode;
  onChange?: (value: string) => void;
}

const InputButton = ({ children, color, onChange }: InputButtonProps) => {
  const [openInput, setOpenInput] = useState<boolean>(false);

  const handleOpenInput = () => setOpenInput(true);
  const handleCloseInput = () => setOpenInput(false);

  return (
    <InputButtonStyled
      type="text"
      size="small"
      style={{ color: color, width: '100%' }}
      onClick={handleOpenInput}
    >
      {children}

      {ReactDOM.createPortal(<Bubble>asdasd</Bubble>, document.body)}
    </InputButtonStyled>
  );
};

const Bubble = styled.div`
  position: absolute;
  padding: 2rem;
  /* background-color: rgba(255, 255, 255, 0.8); */
  background-color: red;
  backdrop-filter: blue(8px);

  inset: 200px auto auto 300px;

  z-index: 9999;
`;

export default InputButton;
