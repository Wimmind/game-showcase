import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GameCardList from '../components/GameCardList'
import { useRouter } from "next/router"
import React, { useState } from "react"

const BASE_URL = `https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29`

export const getServerSideProps = async () => {
  const res = await fetch(`${BASE_URL}&page_size=12`)
  const data = await res.json()
  return { props: { data } }
}

const Home = ({ data }) => {
  const router = useRouter()
  const [games, setGames] = useState(data.results)
  const [page, setPage] = useState(parseInt(router.query.page) || 1);

  const getData = async () => {
    const newPage = page + 1
    setPage(newPage)

    const res = await fetch(`${BASE_URL}&page=${newPage}&page_size=12`)
    const data = await res.json()
    setGames([...games, ...data.results])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Game showcase</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>

      </header>

      <main className={styles.main}>
        <GameCardList games={games} getMoreGames={getData} />
      </main>
    </div>
  )
}

export default Home