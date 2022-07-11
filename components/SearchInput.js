import styled from 'styled-components';
import { useEffect, useState } from "react";
import ClickAwayListener from 'react-click-away-listener';
import GameSearchItem from './GameSearchItem';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
`

const Modal = styled.div`
  width: 100%;
  position: absolute;
  bottom: -375px;
  left: 0px;
  z-index: 1;
  background-color: black;
  color: white;
  height: 370px;
  border-radius: 24px;
  padding: 10px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 24px;
  padding: 0 12px;
`

const SearchInput = ({ searchUrl }) => {
  const [searchValue, setSearchValue] = useState('');
  const [gamesList, setgamesList] = useState([]);
  const [modal, setModal] = useState(false);

  const searchGames = async () => {
    const response = await fetch(`${searchUrl}&search=${searchValue}`);
    const data = await response.json();
    setgamesList(data.results.slice(0, 5));
  }

  useEffect(() => {
    if (searchValue) {
      searchGames();
    } else {
      setModal(false);
    }
  }, [searchValue])

  useEffect(() => {
    if (gamesList.length) {
      setModal(true);
    }
  }, [gamesList])

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      {modal &&
        <ClickAwayListener onClickAway={() => setModal(false)}>
          <Modal>
            <Container>
              {gamesList.map(item => (
                <GameSearchItem key={item.id} {...item} />
              ))}
            </Container>
          </Modal>
        </ClickAwayListener>}
    </Wrapper>
  )
}

export default SearchInput