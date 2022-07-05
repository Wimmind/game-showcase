import React, { useState, useEffect } from "react"
import styled from 'styled-components'
import GameCard from '../components/GameCard'
import InfiniteScroll from "react-infinite-scroll-component"

const GameCardList = ({ gamesData, getMoreGames }) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    if (gamesData) {
      setGames([...games, ...gamesData])
    }
  }, [gamesData])

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={getMoreGames}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {!!games.length && games.map((item) => (
        <GameCard {...item} key={item.id} />
      ))}
    </InfiniteScroll>
  )
}

export default GameCardList