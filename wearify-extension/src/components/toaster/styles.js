import styled from 'styled-components';

export const ToasterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 5;
`;

export const ToasterContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1002;
  max-width: 400px;
  width: calc(100% - 40px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.show {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    width: calc(100% - 32px);
  }
`;

export const ToasterContent = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.4;

  ${ToasterContainer}.error & {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }
  ${ToasterContainer}.success & {
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
  }
  ${ToasterContainer}.warning & {
    background-color: #fffbeb;
    border: 1px solid #fed7aa;
    color: #d97706;
  }
`;

export const ToasterIcon = styled.div`
  flex-shrink: 0;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToasterMessage = styled.div`
  flex: 1;
  margin-right: 12px;
  font-weight: 500;
`;

export const ToasterClose = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${ToasterContainer}.error &:hover {
    background-color: rgba(220, 38, 38, 0.1);
  }
  ${ToasterContainer}.success &:hover {
    background-color: rgba(22, 163, 74, 0.1);
  }
  ${ToasterContainer}.warning &:hover {
    background-color: rgba(217, 119, 6, 0.1);
  }
`;
