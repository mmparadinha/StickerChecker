import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';

export default function Header() {
  const { userInfo } = useContext(UserContext);

  return (
    <Main>
      <h2>Função de troca<br/>(em breve)</h2>
      <h2>Copa do Mundo Qatar 2022 - Status do álbum</h2>
      <h2>{userInfo?.username}</h2>
    </Main>
  );
}

const Main = styled.div`
  background-color: #858585;
  color: #FFFFFF;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 10px;
`;
