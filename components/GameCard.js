import styled from 'styled-components'

const StyledGameCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: grey;
  width: 350px;
`

const StyledGameCardDescription = styled.div`
  display: flex;
  flex-direction: column;
`

const GameCard = ({ background_image, slug, id, rating, released }) => {
  return (
    <StyledGameCard
      href=''
    >
      <img
        src={background_image}
        alt={slug}
        width={'100%'}
        height={200}
        loading='lazy'
      />
      <StyledGameCardDescription>
        <h3>{slug}</h3>
        <span>rating: {rating}</span>
        <span>released: {released}</span>
      </StyledGameCardDescription>
    </StyledGameCard>
  )
}

export default GameCard;



