import styled from 'styled-components'
import { useEffect, useState } from "react"

const BASE_URL_games = `https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29`

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
`

const Modal = styled.div`
  width: 100%;
  position: absolute;
  bottom: -110px;
  left: 0px;
  z-index: 1;
  background-color: blue;
  color: white;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('')
  const [gamesList, setgamesList] = useState([])

  const getGames = async () => {
    const res = await fetch(BASE_URL_games + `&search=${searchValue}`)
    const data = await res.json()
    setgamesList(data.results.slice(0, 5))
  }
  useEffect(() => {
    if (searchValue) {
      getGames()
    }
  }, [searchValue])

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      {!!gamesList.length && <Modal>
        <Container>
          {gamesList.map(item => (
            <span key={item.id}>{item.slug}</span>
          ))}
        </Container>
      </Modal>}
    </Wrapper>
  )
}

export default SearchInput