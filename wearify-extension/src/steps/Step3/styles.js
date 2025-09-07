import styled from 'styled-components';

export const Step3Image = styled.div`
    width: 55%;
    height: 200px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: min(80%, calc(100vw - 32px));
        height: 180px;
        max-width: 300px;
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
        font-size: 25px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        font-family: 'Times', serif;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        font-family: 'Times', serif;
    }

    h4 {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        text-align: center;
        font-family: 'Times', serif;
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
        h4 {
            font-size: 13px;
            font-weight: 500;
            margin-top: 8px;
        }
    }
`;


