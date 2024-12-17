import { css } from '@emotion/react';

export const globalStyles = css`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  body {
    font-family: 'Courier', monospace;
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  pre {
    margin: 0;
  }

  code {
  	padding: 3px 6px;
  	border: none;
  	border-radius: 4px;
    background-color: #e9ecef;
    font-size: 0.8rem;
    line-height: 1.5;
    font-family: "Pretendard", "Courier", sans-serif;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  button img {
    display: block;
  }
`;
