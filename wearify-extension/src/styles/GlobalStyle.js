import { createGlobalStyle } from 'styled-components';

const TimesFont = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/fonts/times.ttf";
const InterFont = "https://cdn.jsdelivr.net/gh/MiqayelChaloyan/wearify-app-live/assets/fonts/Inter_Regular.ttf";


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


