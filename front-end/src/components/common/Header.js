import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import LinearProgress from '@mui/material/LinearProgress';
import { getAlbumProgress } from '../../services/StickerChecker';

export default function Header() {
  const { userInfo } = useContext(UserContext);
  const [progress, setProgress] = useState(0);
  const totalStickersPercentage = 500 / 100;

  async function getProgress() {
    try {
      const response = await getAlbumProgress();
      setProgress(response.data.ownedAmount);
    } catch (error) {
      console.error(error);
      alert('Não foi possível carregar o seu progresso, tente novamente!');
    }
  }

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <>
      <Main>
        <div>
          <h2>Função de troca<br />(em breve)</h2>
          <h2>Copa do Mundo Qatar 2022</h2>
          <h2>{userInfo?.username}</h2>
        </div>
        <div>
          <ProgressBar variant="determinate" value={progress / totalStickersPercentage} color='inherit'/>
          {progress / totalStickersPercentage}%
        </div>
      </Main>
    </>
  );
}

const Main = styled.div`
  background-color: #858585;
  color: #FFFFFF;
  font-weight: 700;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 10px 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    gap: 20px;
  }
`;

const ProgressBar = styled(LinearProgress)`
  width: 100%;
  color: red;
`;
