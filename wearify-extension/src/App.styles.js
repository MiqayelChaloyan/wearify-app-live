import styled from 'styled-components';

export const FloatingButton = styled.button`
  position: fixed;
  right: -20px;
  top: 50%;
  padding: 12px 24px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;
  transform: rotate(90deg);
  font-size: 14px;

  @media (max-width: 768px) {
    right: 8px;
    top: 50%;
    padding: 8px 16px;
    font-size: 12px;
    border-radius: 6px;
  }
`;


