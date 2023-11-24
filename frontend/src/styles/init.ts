import { memo } from 'react';

import { darken, lighten, rgba } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const InitGlobalStyled = memo(createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'NanumSquareRound';
  }

  *::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(220,220,220,0.6);
    border-radius: 2px;
  }

  *::selection {
    background: ${props => props.theme.colors.primary};
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    transition: 250ms color;

    &:hover {
      color: ${props => lighten(0.1, props.theme.colors.primary)};
    }
  }

  .selectable {
    user-select: text;
    -webkit-user-drag: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.colors.textColor1};
  }

  #app {
    height: 100vh;
    color: ${props => props.theme.colors.textColor1};
  }

  html {
    line-height: 1.5715;
    font-size: 10px;
  }

  body {
    overflow: hidden;
    background-color: ${props => props.theme.colors.contentBG};
    color: ${props => props.theme.colors.textColor1};

  }

  p {
    margin: 0;
  }

  .toolbar-wrapper {
    display: flex;
    gap: 2.6rem;
    padding: 0.8rem 2.4rem;
    background-color: rgba(66,66,66,0.3);
    border-radius: 50rem;

    > svg {
      transition: color 120ms ease-in-out;
      cursor: pointer;
      
      :hover {
        color: ${p => p.theme.colors.textColorWhite1};
      }
    }
  }

  .ant-drawer-header {
    height: 6.4rem;
    min-height: 6.4rem;

    padding: 0.3rem 2.4rem 0 !important;
  }

  .ant-message {
    overflow: hidden;
    top: ${p => p.theme.sizes.titleBarHeight} !important;

    .ant-message-notice-wrapper {
      height: 8rem;
    }
  }

  .ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    > span {
      padding-top: 0.2rem;
    }
  }
  
  .ant-table-content {
    white-space: nowrap;
    
    /* Table Head */
    .ant-table-thead {
      position: sticky;
      top: 0;
      z-index: 11;

      .anticon {
        font-size: 8px;
      }

      > tr > th {
        font-weight: normal;
        font-size: ${p => [p.theme.sizes.textSmall]};
        color: ${p => p.theme.colors.textColor2};
        padding: 1rem 1rem;
        background-color: rgb(250, 250, 250, 0.8);
        backdrop-filter: blur(10px);

        ::before {
          display: none;
        }
      }
    }

    .ant-table-tbody > tr > td {
      padding: 1.2rem 1rem;
      background-color: ${p => p.theme.colors.contentBG};
    }

    .ant-table-cell {
      :nth-child(1),
      :nth-child(2) {
        position: sticky;
        z-index: 10;
        background-color: rgb(250, 250, 250, 0.8);
        backdrop-filter: blur(10px);
      }

      :nth-child(1) {
        left: 0;
      }

      :nth-child(2) {
        left: 32px;
        border-right: 1px solid rgb(245, 245, 245);
      }
    }
  }

  .ant-tabs-nav-wrap {
    padding: 0 14px;
  }
`);
