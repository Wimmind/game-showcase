import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import InfiniteScroll from "react-infinite-scroll-component"
import GameCard from '../components/GameCard'

const Home = () => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const [data, setData] = useState([]);
  console.log(data[0])

  const getGames = async () => {
    console.log(page)
    const res = await fetch(`https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29&page=${page}&page_size=8`)
    const res2 = await res.json()
    setData([...data, ...res2.results])
  }

  const getNextGames = async () => {
    setPage(page + 1)
    await getGames()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Game showcase</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <InfiniteScroll
          dataLength={data.length * 20}
          next={getNextGames}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {data.map((item) => (
            <GameCard {...item} key={item.id} />
          ))}
        </InfiniteScroll>

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