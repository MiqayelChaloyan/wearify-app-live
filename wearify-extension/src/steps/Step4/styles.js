import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 30px;

  h2 {
        font-size: 32.5px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        letter-spacing: -0.02em;
        line-height: 100%;
        vertical-align: middle;
        font-family: Times New Roman, serif;
  }

  p {
        font-size: 16.1px;
        line-height: 19.32px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        vertical-align: middle;
        font-family: Times New Roman, serif;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    gap: 12px;

    h2 {
      font-size: 22px;
      line-height: 1.3;
    }

    p {
      font-size: 13px;
      line-height: 1.4;
    }
  }
`;

export const ImageComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    margin: 16px 0;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  .comparison-image {
    width: 140px;
    height: 180px;
    object-fit: contain;
    border: 4px solid #9D9D9D;
    border-radius: 30px;
    background-color: #f0f0f0;
  }

  .uploaded-image {
    position: relative;
    z-index: 1;
    margin-right: -20px;
  }

  .product-image {
    position: relative;
    z-index: 2;
    margin-left: -20px;
    margin-top: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    margin-bottom: 12px;

    .uploaded-image,
    .product-image {
      margin: 0;
    }

    .comparison-image {
      width: min(280px, calc(100vw - 80px));
      height: auto;
      max-height: 300px;
    }
  }
`;

export const ButtonRetry = styled.button`
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
    max-width: 280px;
    font-size: 14px;
    height: 44px;
  }
`;


