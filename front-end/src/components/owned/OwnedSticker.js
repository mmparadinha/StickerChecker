import styled from "styled-components";
import { useState } from "react";
import { removeSticker, addNewSticker } from "../../services/StickerChecker";
import { FiDelete } from "react-icons/fi";

export default function Sticker({ data }) {
    const [disabled, setDisabled] = useState(false);
    const stickerName = data.stickers.countries.name + ' ' + data.stickers.stickerNumber;

    async function unmarkOwned() { 
        let confirmation = window.confirm(`Você tem certeza que deseja remover a figurinha ${stickerName} da sua lista?\nTODOS exemplares iguais serão removidos.\nPara remover apenas uma, utilize a aba de Repetidas`);
        if (confirmation) {
            try {
                await removeSticker(data.id);
                setDisabled(true);
            } catch (error) {
                console.error(error);
                alert('Não foi possível, tente novamente!');
            }
        }
    }

    //bug fix: executando as duas funções quando clica para deletar a figurinha
    async function markSticker() { 
        try {
            await addNewSticker(data.id);
        } catch (error) {
            console.error(error);
            alert('Não foi possível, tente novamente!');
        }
    }
    
    return (
        <Main disabled={disabled} onClick={markSticker}>
            <Teste>
                <DeleteButton onClick={unmarkOwned}/>
            </Teste>
            <p>{stickerName}</p>
            <AmountContainer>{data.amount}</AmountContainer>
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

    &:disabled {
        cursor: default;
    }
`;

const Teste = styled.div`
    position: absolute;
    top: 3px;
    right: 3px;
`;

const DeleteButton = styled(FiDelete)`
    
    font-size: 24px;
    color: darkred;
`;

const AmountContainer = styled.div`
    background-color: gray;
    color: white;

    height: 25px;
    width: 25px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 50%;
    border: 1px solid navy;

    position: absolute;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
