import { createGlobalStyle } from 'styled-components';
import TimesFont from '../assets/fonts/times.ttf';
import InterFont from '../assets/fonts/Inter_Regular.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Times';
    src: url(${TimesFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  #wearify-root {
    font-family: 'Inter', serif;
    box-sizing: border-box;
    overflow-x: hidden;
    max-width: 100vw;
  }
`;


