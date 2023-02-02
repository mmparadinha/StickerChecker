import styled from "styled-components";

export function Description() {
    return (
    <DescriptionContainer>
        <h1>Sticker Checker</h1>
        <p>acompanhe o progresso do seu álbum da forma mais prática possível</p>
    </DescriptionContainer>
    );
}

const DescriptionContainer = styled.div`
width: 60vw;
height: 100vh;

background-color: yellow;
color: #000080;
padding: 15px;
gap: 20px;

display: flex;
flex-direction: column;
justify-content: center;

h1 {
  font-size: 106px;
  font-weight: 700;
}

p {
  font-size: 43px;
  font-weight: 400;
  line-height: 64px;
}

@media (max-width: 1050px) {
  h1 {
    font-size: 66px;
    font-weight: 700;
  }

  p {
    font-size: 22px;
    font-weight: 400;
    line-height: 33px;
  }
}

@media (max-width: 645px) {
  width: 100vw;
  height: 35vh;
  justify-content: center;
  text-align: center;
}
`;