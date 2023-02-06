import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Footer({ props }) {
  return (
    <Main>
      <Menu to='/missing' selected={props.missing}>
        <h2>Faltantes</h2>
      </Menu>
      <Menu to='/' selected={props.owned}>
        <h2>Obtidas</h2>
      </Menu>
      <Menu to='/doubled' selected={props.doubled}>
        <h2>Repetidas</h2>
      </Menu>
    </Main>
  );
}

const Main = styled.div`
    background-color: #858585;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
    padding: 10px;
`;

const Menu = styled(Link)`
    width: 200px;
    padding: 10px;
    border-radius: 20px;
    text-align: center;
    font-weight: 700;

    color: ${props => props.selected ? '#FFFFFF' : '#000080'};
    background-color: ${props => props.selected ? '#000080' : '#FFFFFF'};
    border: 2px solid ${props => props.selected ? '#FFFFFF' : '#000080'};
`;
