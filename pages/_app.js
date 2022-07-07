import '../styles/globals.css'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }) {

  setTimeout(function () {
    console.log('s1')
  }, 0)
  setTimeout(function () {
    console.log('s2')
  }, 1000)
  new Promise(function (resolve) {
    console.log('p1')
    resolve()
    console.log('p2')
  }).then(function () {
    console.log('p3')
  })
  console.log('w1')
  async function test1() {
    console.log('a1')
    await test2()
    console.log('a2')
  }
  async function test2() {
    console.log('a3')
  }
  test1()
  console.log('w2')

  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
