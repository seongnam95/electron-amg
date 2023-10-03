import { motion } from "framer-motion";
import { ReactNode, MouseEvent } from "react";
import { HeaderStyled } from "./styled";

interface HeaderProps {
  title?: string;
  subTitle?: ReactNode;
  height?: string;
  actionIcon?: string;
  actionOnClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Header({
  title,
  subTitle,
  height,
  actionIcon,
  actionOnClick,
}: HeaderProps) {
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
              <i className={actionIcon} color="var(--text)" />
            </button>
          ) : null}
        </div>
        {subTitle ? (
          <div className="description-content">{subTitle}</div>
        ) : null}
      </motion.div>
    </HeaderStyled>
  );
}

export default Header;
