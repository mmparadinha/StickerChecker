import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMissingStickers } from "../../services/StickerChecker.js";
import Header from "../common/Header.js";
import Footer from "../common/Footer.js";
import Sticker from "./MissingSticker.js";

export default function Missing() {
    const [stickers, setStickers] = useState([]);
    const activeFooter = { missing: true};

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
            <Header/>
            <Main>
                <h1>Faltantes</h1>
                <Container>
                    {stickers.map(data => <Sticker key={data.id} data={data}/>)}
                </Container>
            </Main>
            <Footer params={activeFooter}/>
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