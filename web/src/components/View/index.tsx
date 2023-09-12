import styled from "styled-components";
import { motion } from "framer-motion";

interface ViewProps {
  title?: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
}

export function View({ title, text, children }: ViewProps) {
  return (
    <StyledView>
      {title || text ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="description-box">
            {title ? <span className="description-title">{title}</span> : null}
            {text ? <span className="description-content">{text}</span> : null}
          </div>
        </motion.div>
      ) : null}

      <motion.div
        className="children-wrap"
        initial={{ opacity: 0, x: -10, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </StyledView>
  );
}

// styled
const StyledView = styled.div<{ header?: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 3.4rem;

  padding: 3.4rem 2rem 11.8rem;
  height: 100%;

  .description-box {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3.4rem;

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
