import styled from "styled-components";
import { useState } from "react";
import { unmarkSticker } from "../../services/StickerChecker";

export default function Sticker({userStickerId, data}) {
    const [disabled, setDisabled] = useState(false);
    const stickerName = data.countries.name + ' ' + data.stickerNumber;

    async function unmarkOwned() { 
        console.log(userStickerId)
        let confirmation = window.confirm(`Você tem certeza que deseja remover a figurinha ${stickerName} da sua lista?\nTODOS exemplares iguais serão removidos.\nPara remover apenas uma, utilize a aba de Repetidas`);
        if (confirmation) {
            try {
                await unmarkSticker(userStickerId);
                setDisabled(true);
            } catch (error) {
                console.error(error);
                alert('Não foi possível, tente novamente!');
            }
        }
    }
    
    return (
        <Main disabled={disabled} onClick={unmarkOwned}>
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