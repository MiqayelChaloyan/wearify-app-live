import styled from 'styled-components';

export const Step2Image = styled.img`
    width: 70%;
    height: 300px;
    object-fit: contain;
    object-position: center;
    display: block;
    margin: 0 auto;

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


