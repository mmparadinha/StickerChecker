import styled from "styled-components";
import { removeDoubled } from "../../services/StickerChecker";

////avaliar se vai ser necessário desabilitar a figurinha, por não atualizar a pagina sempre

export default function Sticker({ data }) {
    const stickerName = data.stickers.countries.name + ' ' + data.stickers.stickerNumber;
    const necessaryAmount = 1;

    async function decreaseDoubledSticker() { 
        try {
            await removeDoubled(data.id);
        } catch (error) {
            console.error(error);
            alert('Não foi possível, tente novamente!');
        }
    }
    
    return (
        <Main onClick={decreaseDoubledSticker}>
            <p>{stickerName}</p>
            <AmountContainer>{data.amount - necessaryAmount}</AmountContainer>
        </Main>
    );
}

const Main = styled.button`
    background-color: lightgray;
    height: 100px;
    width: 80px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    position: relative;

    &:hover {
        cursor: pointer;
    }
`;

const AmountContainer = styled.div`
    background-color: gray;
    color: white;

    height: 25px;
    width: 25px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 50%;
    border: 2px solid yellow;

    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;