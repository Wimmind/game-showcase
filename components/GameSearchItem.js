import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const GameItem = styled.div`
  display: flex;
  width: 100%;
  padding: 5px;
  cursor: pointer;
`

const Title = styled.h5`
  margin-left: 15px;
`

const GameSearchItem = ({ background_image, slug }) => {
  return (
    <Link href={`/games/${slug}`}>
      <GameItem>
        <Image
          src={background_image}
          alt={slug}
          width={40}
          height={30}
        />
        <Title>{slug}</Title>
      </GameItem>
    </Link>
  )
}

export default GameSearchItem;



