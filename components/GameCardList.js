import styled from 'styled-components';
import GameCard from '../components/GameCard';
import InfiniteScroll from "react-infinite-scroll-component";

const GameCardListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Loader = styled.h4`
  text-align: center;
  color: white;
`

const GameCardList = ({ games, getMoreGames, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={games.length}
      next={getMoreGames}
      hasMore={hasMore}
      loader={<Loader>Loading...</Loader>}
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