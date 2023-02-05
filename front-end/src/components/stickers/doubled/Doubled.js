import { useEffect, useState } from 'react';
import { getDoubledStickers } from '../../../services/StickerChecker.js';
import Header from '../../common/Header.js';
import Footer from '../../common/Footer.js';
import Sticker from './DoubledSticker.js';
import { MainPage } from '../MainPage.js';
import { StickersBox } from '../StickersBox.js';

export default function Doubled() {
  const [stickers, setStickers] = useState([]);
  const activeFooter = { doubled: true };

  async function listDoubledStickers() {
    try {
      const response = await getDoubledStickers();
      setStickers(response.data);
    } catch (error) {
      console.error(error);
      alert('Não foi possível carregar as suas figurinhas repetidas, tente novamente!');
    }
  }

  useEffect(() => {
    listDoubledStickers();
  }, [stickers]);

  return (
    <>
      <Header />
      <MainPage>
        <h1>Repetidas</h1>
        <StickersBox>
          {stickers.map(data => <Sticker key={data.id} data={data} />)}
        </StickersBox>
      </MainPage>
      <Footer params={activeFooter} />
    </>
  );
}
