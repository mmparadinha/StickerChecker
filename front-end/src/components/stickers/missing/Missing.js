import { useEffect, useState } from 'react';
import { getMissingStickers } from '../../../services/StickerChecker.js';
import Header from '../../common/Header.js';
import Footer from '../../common/Footer.js';
import Sticker from './MissingSticker.js';
import { MainPage } from '../MainPage.js';
import { StickersBox } from '../StickersBox.js';

export default function Missing() {
  const [stickers, setStickers] = useState([]);
  const activeFooter = { missing: true };

  async function listMissingStickers() {
    try {
      const response = await getMissingStickers();
      setStickers(response.data);
    } catch (error) {
      console.error(error);
      alert('Não foi possível carregar as suas figurinhas repetidas, tente novamente!');
    }
  }

  useEffect(() => {
    listMissingStickers();
  }, []);

  return (
    <>
      <Header />
      <MainPage>
        <h1>Faltantes</h1>
        <StickersBox>
          {stickers.map(data => <Sticker key={data.id} data={data} />)}
        </StickersBox>
      </MainPage>
      <Footer params={activeFooter} />
    </>
  );
}
