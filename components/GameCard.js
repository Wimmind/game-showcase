import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Wrapper = styled.div`
  padding: 12px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: hsla(0,0%,100%,.16);
  cursor: pointer;
  border-radius: 15px;
  color: white;
  text-align: center;
  width: 320px;
`

const GameCard = ({ background_image, slug, rating, released }) => {
  return (
    <Link href={`/games/${slug}`}>
      <Wrapper>
        <Container>
          <h3>{slug}</h3>
          <Image
            src={background_image}
            alt={slug}
            width={320}
            height={240}
          />
          <span>rating: {rating}</span>
          <span>released: {released}</span>
        </Container>
      </Wrapper>
    </Link>
  )
}

export default GameCard;



