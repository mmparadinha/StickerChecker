import { useEffect, useState } from 'react';
import { getOwnedStickers } from '../../../services/StickerChecker.js';
import Header from '../../common/Header.js';
import Footer from '../../common/Footer.js';
import Sticker from './OwnedSticker.js';
import { MainPage } from '../MainPage.js';
import { StickersBox } from '../StickersBox.js';

export default function Owned() {
  const [stickers, setStickers] = useState([]);
  const activeFooter = { owned: true };

  async function listOwnedStickers() {
    try {
      const response = await getOwnedStickers();
      setStickers(response.data);
    } catch (error) {
      console.error(error);
      alert('Não foi possível carregar a sua lista, tente novamente!');
    }
  }

  useEffect(() => {
    listOwnedStickers();
  }, [stickers]);

  return (
    <>
      <Header />
      <MainPage>
        <h1>Obtidas</h1>
        <StickersBox>
          {stickers.map(data => <Sticker key={data.id} data={data} />)}
        </StickersBox>
      </MainPage>
      <Footer params={activeFooter} />
    </>
  );
}
