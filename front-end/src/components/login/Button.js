import styled from 'styled-components';

export const Button = styled.button`
    background-color: #5D9040;
    width: 100%;
    height: 65px;
    border: none;
    margin-top: 15px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 24px;
    color: #FFFFFF;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        filter: brightness(1.2);
        cursor: pointer;
    }

    &:disabled {
        filter: brightness(0.7);
        cursor: default;
    }

    @media (max-width: 1050px) {
        height: 45px;
        font-size: 16px;
    }

    @media (max-width: 645px) {
        height: 55px;
        font-size: 20px;
    }
`;
