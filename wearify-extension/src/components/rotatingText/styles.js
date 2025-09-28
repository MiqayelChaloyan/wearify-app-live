import styled from 'styled-components';

export const WordsWrapper = styled.h2`
  font-size: 32.5px;
  font-weight: 400 !important;
  color: #000000;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 100%;
  vertical-align: middle;
  font-family: Times New Roman, serif !important;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Words = styled.span`
  width: 100%;
  display: inline-block;
  position: relative;
  vertical-align: bottom;
  height: 40px;
  padding: 0 10px;
  border-radius: 6px;
  box-sizing: content-box;
  overflow: hidden;
  transition: color 0.5s, width 0.5s;

  @media (max-width: 768px) {
    width: var(--width-mobile, auto) !important;
    height: 35px;
    padding: 0 8px;
  }
`;

export const WordSpan = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, 100%);
  transition: transform 0.7s ease, opacity 0.5s ease;
  white-space: nowrap;

  &.active {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  &.exit {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
`;


