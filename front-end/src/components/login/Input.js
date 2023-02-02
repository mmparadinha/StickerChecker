import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 65px;
  font-weight: 400;
  font-size: 24px;
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

  &::placeholder {
    color: #9C9C9C;
  }

  &:disabled {
    background-color: #F2F2F2;
    color: #D4D4D4;
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