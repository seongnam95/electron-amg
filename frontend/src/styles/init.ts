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

  ul {
    list-style-type: none;
    list-style: none;
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

  /* Drawer */
  .ant-drawer-header {
    height: 6.4rem;
    min-height: 6.4rem;

    padding: 0.3rem 2.4rem 0 !important;
  }

  /* Message */
  .ant-message {
    overflow: hidden;
    top: ${p => p.theme.sizes.titleBarHeight} !important;

    .ant-message-notice-wrapper {
      height: 8rem;
    }
  }

  /* Button */
  .ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    > span {
      padding-top: 0.2rem;
    }
  }
  
  .ant-table-wrapper {
    height: 100%;

    .ant-table-cell-fix-left {
      z-index: 10;
    }

    .ant-table-cell-fix-right {
      z-index: 10;
    }

    .ant-spin-nested-loading {
      height: 100%;
    }

    .ant-spin-container {
      height: 100%;
    }

    .ant-table {
      height: 100%;
    }

    .ant-table-container{
      height: 100%;
    }
  }
  
  /* Table Head */
  .ant-table-thead .anticon {
    font-size: 8px;
    padding: 0 0.4rem;
  }

  .ant-tabs-nav-wrap {
    padding: 0 14px;
  }

  /* Breadcrumb */
  .ant-breadcrumb-separator {
    display: flex;
    align-items: center;
  }

  /* Input */
  .ant-input-affix-wrapper {
    .ant-input-prefix {
      margin-inline-end: 12px;
    }
    
    svg {
      color: #909090;
    }
  }

`);
