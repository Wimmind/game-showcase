import styled from "styled-components";
import Slider from "react-slick";
import Image from 'next/image'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
  color: white;
`

const SliderContainer = styled.div`
  padding: 15px;
`

const Link = styled.a`
  cursor: pointer;
`

export const getServerSideProps = async (context) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}games/${context.query.slug}?key=${process.env.NEXT_PUBLIC_KEY}`)
  const gameData = await result.json()

  const screenshotsResult = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}games/${gameData.slug}/screenshots?key=${process.env.NEXT_PUBLIC_KEY}`)
  const screenshotsData = await screenshotsResult.json()

  return { props: { gameData, screenshotsData: screenshotsData.results } }
}

const GameInfo = ({ gameData, screenshotsData }) => {
  return (
    <Wrapper>
      <h1>{gameData.slug}</h1>
      <Link href={gameData.metacritic_url}>
        <h4>Link metacritic_url</h4>
      </Link>
      <p>{gameData.description_raw}</p>
      <SliderContainer>
        <Slider settings={{
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        }}>
          {screenshotsData.map((item, key) => (
            <Image
              key={key}
              src={item.image}
              alt={'screenshot'}
              width={800}
              height={500}
            />
          ))}
        </Slider>
      </SliderContainer>
    </Wrapper>
  )
}

export default GameInfo;
