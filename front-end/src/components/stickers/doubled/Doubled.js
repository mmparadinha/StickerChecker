import { useEffect, useState } from 'react';
import { getDoubledStickers } from '../../../services/StickerChecker.js';
import Header from '../../common/Header.js';
import Footer from '../../common/Footer.js';
import { MainPage } from '../MainPage.js';
import StickersBox from '../StickersBox.js';

export default function Doubled() {
  const [stickers, setStickers] = useState([]);
  const activePage = { doubled: true };

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
  }, []); //TO DO - renderizando infinitamente se relacionar com stickers. Se não relacionar, não fica reativo

  return (
    <>
      <Header />
      <MainPage>
        <h1>Repetidas</h1>
        {stickers.map(country => <StickersBox key={country.id} data={country} props={activePage}/>)}
      </MainPage>
      <Footer props={activePage} />
    </>
  );
}
