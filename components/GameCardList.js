import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styled from 'styled-components'

const GameCardList = ({ gamesData }) => {
  const [games, setGames] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (gamesData) {
      setGames(gamesData)
    }
  }, [gamesData])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  const handleScroll = () => {
    // To get page offset of last user
    const lastUserLoaded = document.querySelector(
      ".user-list > .user:last-child"
    )
    if (lastUserLoaded) {
      const lastUserLoadedOffset =
        lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
      const pageOffset = window.pageYOffset + window.innerHeight
      // Detects when user scrolls down till the last user
      if (pageOffset > lastUserLoadedOffset) {
        // Stops loading
        if (gamesData.curPage < gamesData.maxPage) {
          // Trigger fetch
          const query = router.query
          query.page = parseInt(gamesData.curPage) + 1
          router.push({
            pathname: router.pathname,
            query: query,
          })
        }
      }
    }
  }

  return (
    <>
      <ul className="user-list">
        {games.length > 0 &&
          games.map((user, i) => {
            return (
              <li className="user" key={i}>
                <span>{user.name}</span>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default GameCardList