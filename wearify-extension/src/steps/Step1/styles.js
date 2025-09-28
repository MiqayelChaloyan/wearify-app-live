import styled from 'styled-components';

export const Step1Image = styled.img`
    width: 90%;
    height: 300px;
    object-fit: contain;
    object-position: center;
    display: block;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 768px) {
        width: min(90%, calc(100vw - 32px));
        height: 250px;
        max-width: 350px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 60px 0;

    h2 {
        font-size: 32.5px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        letter-spacing: -0.02em;
        line-height: 1.2;
        margin: 0;
        font-family: Times New Roman, serif !important;
    }

    p {
        font-size: 16.1px;
        line-height: 1.2;
        font-weight: 400;
        color: #000000;
        text-align: center;
        margin: 0;
        font-family: Times New Roman, serif !important;
    }

    @media (max-width: 768px) {
        padding: 20px 16px;
        gap: 8px;

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


