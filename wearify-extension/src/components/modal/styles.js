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
  border-bottom: 2px solid #e5e7eb;
  margin: 0 24px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: #9D9D9D;
  font-family: Inter, serif;
  letter-spacing: -0.02em;
  line-height: 100%;

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
  overflow-y: hidden;
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
  gap: 12px;

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
  font-size: 15.2px;
  font-weight: 600;
  width: 153px;
  height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  line-height: 100%;
  justify-content: center;
  cursor: pointer;
  font-family: Times New Roman, Regular;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 14px;
    height: 44px;
  }
`;

export const ModalRemove = styled.button`
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #d1d5db;
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

  &:hover {
    background-color: #f9fafb;
  }

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

export const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`;

export const ConfirmContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 420px;
  max-width: 90vw;
  padding: 20px;
`;

export const ConfirmTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  font-family: 'Inter', serif;
`;

export const ConfirmText = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #4b5563;
  font-family: 'Inter', serif;
`;

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ConfirmCancel = styled.button`
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Times', serif;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const ConfirmDelete = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Times', serif;

  &:hover {
    background-color: #b91c1c;
  }
`;


