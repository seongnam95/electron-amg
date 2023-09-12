import { HTMLAttributes, ReactElement } from "react";

import * as icons from "./svg";
import styled from "styled-components";

export type IconType = keyof typeof icons;
export const iconTypes: IconType[] = Object.keys(icons) as IconType[];

export interface IconProps extends HTMLAttributes<HTMLElement> {
  icon: IconType;
  size?: string;
  hoverColor?: string;
}

export function Icon(props: IconProps): ReactElement {
  const SVGIcon = icons[props.icon];

  return (
    <StyledIconBox
      className={props.className ? props.className : "icon"}
      onClick={props.onClick}
      {...props}
    >
      <SVGIcon />
    </StyledIconBox>
  );
}

const StyledIconBox = styled.div<IconProps>`
  display: inline-flex;

  svg {
    height: auto;
    width: ${(props) => props.size || "2.4rem"};
    min-width: ${(props) => props.size || "2.4rem"};
    fill: ${(props) => props.color || "var(--icon-color)"};
    transition: all var(--ease-in-out-1);
    cursor: ${(props) => props.onClick && "pointer"};

    :hover {
      fill: ${(props) => props.hoverColor};
    }
  }
`;
