import styled from "styled-components";
import { Input } from "@components";
import { AnimatePresence, motion } from "framer-motion";

export const BankInput = () => {
  return (
    <BankInputStyled>
      <Input type="number" />
      <motion.div className="bank-btn-wrap">
        <button className="bank-btn">카카오뱅크</button>
      </motion.div>
    </BankInputStyled>
  );
};

const BankInputStyled = styled.div`
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
