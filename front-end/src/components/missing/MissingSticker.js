import styled from "styled-components";
import { addNewSticker } from "../../services/StickerChecker";

//avaliar se vai ser necessário desabilitar a figurinha, por não atualizar a pagina sempre

export default function Sticker({userStickerId, data}) {
    const stickerName = data.countries.name + ' ' + data.stickerNumber;

    async function markSticker() { 
        try {
            await addNewSticker(userStickerId);
        } catch (error) {
            console.error(error);
            alert('Não foi possível, tente novamente!');
        }
    }
    
    return (
        <Main onClick={markSticker}>
            <p>{stickerName}</p>
        </Main>
    );
}

const Main = styled.button`
    background-color: lightgray;
    height: 100px;
    width: 80px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;