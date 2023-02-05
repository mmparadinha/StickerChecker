import styled from 'styled-components';

export const FormContainer = styled.form`
  width: 40vw;
  gap: 15px;
  padding: 20px;

  background-color: #858585;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 auto;
    color: white;
    font-size: 20px;
    font-weight: 400;
    text-align: center;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media (max-width: 1050px) {
    p {
      font-size: 14px;
    }
  }

  @media (max-width: 645px) {
    width: 100vw;
    height: 65vh;
    justify-content: center;

    p {
      font-size: 17px;
    }
  }
`;
