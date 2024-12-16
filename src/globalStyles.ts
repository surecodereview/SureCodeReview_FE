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
  }

  pre {
    margin: 0;
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
