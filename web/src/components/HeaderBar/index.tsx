import styled from "styled-components";
import { Icon } from "@components";

interface HeaderBarProps {
  title: string;
  isScrolling?: boolean;
  fixed?: boolean;
  onClickBack?: () => void;
  onClickClose?: () => void;
}

export function HeaderBar({
  title,
  isScrolling,
  fixed = true,
  onClickBack,
  onClickClose,
}: HeaderBarProps) {
  return (
    <StyledHeaderBar isScrolling={isScrolling} fixed={fixed}>
      {onClickBack ? (
        <button className="icon-btn back" onClick={onClickBack}>
          <Icon icon={"backOutline"} size="2.2rem" color="var(--text)" />
        </button>
      ) : null}
      <span className="title-text">{title}</span>
      {onClickClose ? (
        <button className="icon-btn close" onClick={onClickClose}>
          <Icon icon={"closeOutline"} size="2.6rem" color="var(--text)" />
        </button>
      ) : null}
    </StyledHeaderBar>
  );
}

// styled
const StyledHeaderBar = styled.div<{ isScrolling?: boolean; fixed?: boolean }>`
  position: ${(p) => (p.fixed ? "fixed" : "")};
  z-index: ${(p) => (p.fixed ? "9999" : "")};
  left: ${(p) => (p.fixed ? "0" : "")};
  top: ${(p) => (p.fixed ? "0" : "")};

  display: flex;
  align-items: center;
  background-color: (255, 255, 255, 0.3);
  backdrop-filter: blur(1rem);

  height: 5.6rem;
  width: 100%;
  border-bottom: ${(p) =>
    p.isScrolling ? "none" : "1px solid var(--border-color)"};

  user-select: none;

  .icon-btn {
    position: absolute;
    display: flex;
    height: 4.6rem;
    width: 4.6rem;
    justify-content: center;
    align-items: center;
    padding-top: 0.4rem;

    outline: none;
    border: none;
    background-color: transparent;

    &.back {
      left: 1rem;
    }

    &.close {
      right: 1rem;
    }
  }

  .title-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% + 0.3rem));
    font-size: var(--font-size-2xl);
    color: var(--text);
    font-weight: bold;
  }
`;
