import styled, { keyframes } from 'styled-components';

export const ClientImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  min-height: 400px;

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    min-height: 250px;
  }
`;

export const ClientImage = styled.img`
  width: 80%;
  max-width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
    max-height: 60vh;
  }

  @media (max-width: 480px) {
    width: 95%;
    max-height: 50vh;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    border-width: 3px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    height: 250px;
    gap: 12px;
    padding: 16px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  flex-direction: column;
  gap: 16px;
  text-align: center;

  @media (max-width: 768px) {
    height: 250px;
    gap: 12px;
    padding: 16px;
  }
`;

export const ProductImageContainer = styled.div`
  position: fixed;
  top: 112px;
  right: 10px;
  width: 126px;
  height: 200px;
  z-index: 1000;

  img {
    width: 126px;
    height: 128px;
    object-fit: contain;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  p {
    margin: 0 auto;
    width: 126px;
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    text-align: center;
    font-family: Times New Roman, serif;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 16px;
    width: 100px;
    height: 160px;

    img {
      width: 100px;
      height: 100px;
    }

    p {
      width: 100px;
      font-size: 14px;
      -webkit-line-clamp: 2;
    }
  }
`;


