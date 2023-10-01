import { LayoutGroup, motion } from "framer-motion";
import { HTMLAttributes, ReactNode, useState } from "react";
import styled from "styled-components";

export interface TabBarItem {
  label: string;
  view: ReactNode;
}

interface TabBarProps extends HTMLAttributes<HTMLDivElement> {
  items: Array<TabBarItem>;
  selected?: number;
}

export function TabBar({ items, selected, ...props }: TabBarProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(selected || 0);

  return (
    <StyledTabBar {...props}>
      <ul className="tab-bar">
        <LayoutGroup>
          {items.map((item, index) => {
            const isActivated = index === selectedIndex;
            return (
              <TabBarItem
                activated={isActivated}
                onClick={() => setSelectedIndex(index)}
              >
                {isActivated && (
                  <motion.div
                    className="tab-active"
                    layoutId="tab-active"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  ></motion.div>
                )}
                {item.label}
              </TabBarItem>
            );
          })}
        </LayoutGroup>
      </ul>

      <div className="tab-view-content">{items[selectedIndex].view}</div>
    </StyledTabBar>
  );
}

const StyledTabBar = styled.div`
  display: flex;
  flex-direction: column;

  .tab-bar {
    width: 100%;
    display: flex;
  }

  .tab-view-content {
    padding-top: 3.4rem;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabBarItem = styled.li<{ activated?: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4.6rem;
  border-bottom: 1px solid var(--border-color);
  font-size: var(--font-size-m);
  color: ${(p) => (p.activated ? "var(--blue)" : "var(--text-hint)")};
  font-weight: ${(p) => (p.activated ? "bold" : "normal")};

  transition: all 200ms;
  cursor: pointer;

  .tab-active {
    position: absolute;
    background-color: var(--blue);
    width: calc(100%);
    height: 2px;
    bottom: 0;
  }
`;
