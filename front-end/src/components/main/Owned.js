import styled from "styled-components";
import { useEffect, useState } from "react";
import { getOwnedStickers } from "../../services/StickerChecker.js";
import Header from "../common/Header.js";
import Footer from "../common/Footer.js";
import Sticker from "./Sticker.js";

export default function Owned() {
    const [stickers, setStickers] = useState([]);

    async function listOwnedStickers() {
      const response = await getOwnedStickers();
      setStickers(response.data);
    }
  
    useEffect(() => {
        listOwnedStickers();
    }, []);

    return (
        <>
            <Header/>
            <Main>
                <h1>Obtidas</h1>
                <Container>
                    {stickers.map(data => <Sticker key={data.id} data={data.stickers}/>)}
                </Container>
            </Main>
            <Footer/>
        </>
    );
}

const Main = styled.div`
    background-color: green;
    min-width: 100vw;
    min-height: 100vh;
    margin-top: 50px;
    padding: 20px;
`;

const Container = styled.div`
    background-color: yellow;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
`;