import '../styles/globals.css'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
`

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </main>
  )
}

export default MyApp
