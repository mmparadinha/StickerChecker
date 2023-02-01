import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../context/UserContext";

export default function Header() {
  const { userInfo } = useContext(UserContext);

    return (
      <Main>
        <h2>Função de troca</h2>
        <h2>Nome do álbum - Status do álbum</h2>
        <h2>{userInfo.username}</h2>
      </Main>
      );
}

const Main = styled.div`
  background-color: cyan;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 10px;
`;