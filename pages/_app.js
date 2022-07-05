import '../styles/globals.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
