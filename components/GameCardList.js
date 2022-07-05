import styled from 'styled-components'
import GameCard from '../components/GameCard'
import InfiniteScroll from "react-infinite-scroll-component"

const GameCardListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const GameCardList = ({ games, getMoreGames }) => {
  return (
    <InfiniteScroll
      dataLength={games.length}
      next={getMoreGames}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <GameCardListWrapper >
        {!!games.length && games.map((item) => (
          <GameCard {...item} key={item.id} />
        ))}
      </GameCardListWrapper>

    </InfiniteScroll>
  )
}

export default GameCardList