import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import { Icon, IconType } from "@components";

interface HeaderProps {
  title?: string;
  subTitle?: ReactNode;
  height?: string;
  actionIcon?: IconType;
  actionOnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({
  title,
  subTitle,
  height,
  actionIcon,
  actionOnClick,
}: HeaderProps) => {
  return (
    <HeaderStyled height={height}>
      <motion.div
        className="title-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="title">
          <span className="title-text">{title}</span>
          {actionIcon ? (
            <button className="action-btn" onClick={actionOnClick}>
              <Icon icon={actionIcon} color="var(--text)" />
            </button>
          ) : null}
        </div>
        {subTitle ? (
          <div className="description-content">{subTitle}</div>
        ) : null}
      </motion.div>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div<{ height?: string }>`
  padding: 0 2rem;

  .title-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: ${(p) => (p.height ? p.height : "9rem")};

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-text {
        color: var(--text);
        font-size: var(--font-size-2xl);
        font-weight: bold;
      }

      .action-btn {
        height: 4rem;
        width: 4rem;
        border: none;
        outline: none;
        background-color: transparent;
        border-radius: 50%;
        transition: all 200ms;

        > svg {
          fill: var(--text) !important;
        }
      }
    }

    .description-content {
      color: var(--text-sub);
      font-size: var(--font-size-xs);
      line-height: 150%;
    }
  }
`;
