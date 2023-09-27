import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeaderProps {
  title?: string;
  subTitle?: ReactNode;
  height?: string;
}

export const Header = ({ title, subTitle, height }: HeaderProps) => {
  return (
    <HeaderStyled height={height}>
      <motion.div
        className="description-box"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="description-title">{title}</span>
        {subTitle ? (
          <span className="description-content">{subTitle}</span>
        ) : null}
      </motion.div>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div<{ height?: string }>`
  .description-box {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: ${(p) => (p.height ? p.height : "9rem")};

    .description-title {
      color: var(--text);
      font-size: var(--font-size-2xl);
      font-weight: bold;
    }

    .description-content {
      color: var(--text-sub);
      font-size: var(--font-size-xs);
      line-height: 150%;
    }
  }
`;
