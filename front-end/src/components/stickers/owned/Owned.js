import { useEffect, useState } from 'react';
import { getOwnedStickers } from '../../../services/StickerChecker.js';
import Header from '../../common/Header.js';
import Footer from '../../common/Footer.js';
import { MainPage } from '../MainPage.js';
import StickersBox from '../StickersBox.js';

export default function Owned() {
  const [stickers, setStickers] = useState([]);
  const activePage = { owned: true };

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
  }, []); //TO DO - renderizando infinitamente se relacionar com stickers. Se não relacionar, não fica reativo

  return (
    <>
      <Header />
      <MainPage>
        <h1>Obtidas</h1>
        {stickers.map(country => <StickersBox key={country.id} data={country} props={activePage}/>)}
      </MainPage>
      <Footer props={activePage} />
    </>
  );
}
