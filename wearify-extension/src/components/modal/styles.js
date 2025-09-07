import styled, { keyframes } from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 500px;
  max-width: 90vw;
  height: 98vh;
  max-height: 98vh;
  overflow: hidden;
  margin: 8px 8px 0 0;
  position: relative;

  @media (max-width: 768px) {
    margin: 8px;
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    max-height: calc(100vh - 16px);
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const ModalDivider = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin: 0 24px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #9D9D9D;
  font-family: 'Inter', serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9D9D9D;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

export const ModalContent = styled.div`
  overflow-y: auto;
  height: 75%;
  max-height: 75vh;
  background-color: #ffffff;
  padding: 30px 0;

  @media (max-width: 768px) {
    padding: 16px;
    height: calc(100% - 140px);
    max-height: calc(100% - 140px);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const ModalNext = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;
  width: 153px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Times', serif;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
    height: 44px;
  }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;


