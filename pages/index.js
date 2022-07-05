import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GameCardList from '../components/GameCardList'
import { useRouter } from "next/router"
import React, { useState } from "react"

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1

  const res = await fetch(`https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29&page=${page}&page_size=8`)
  const data = await res.json()

  return { props: { data } }
}

const Home = ({ data }) => {
  const router = useRouter()
  const [page, setPage] = useState(parseInt(router.query.page) || 1);


  // const getData = async () => {
  //   console.log(page)
  //   const res = await fetch(`https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29&page=${page}&page_size=8`)
  //   const res2 = await res.json()
  // }

  const getData = () => {
    const newPage = page + 1
    setPage(newPage)

    // const query = router.query
    // query.page = newPage
    // router.push({
    //   pathname: router.pathname,
    //   query: query,
    // })

    router.push(`/?page=${newPage}`, undefined, { shallow: true });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Game showcase</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <GameCardList gamesData={data.results} getMoreGames={getData} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        > Powered by Wimmind</a>
      </footer>
    </div>
  )
}

export default Home