import GameCardList from '../components/GameCardList'
import { useEffect, useState } from "react"
import styled from 'styled-components'
import Select from 'react-select'
import SearchInput from '../components/SearchInput'

const BASE_URL_games = `https://api.rawg.io/api/games?key=070ea00c7ee84dcbba2c14e7c7451e29`
const BASE_URL_platforms = `https://api.rawg.io/api/platforms?key=070ea00c7ee84dcbba2c14e7c7451e29`

export const getServerSideProps = async () => {
  const res = await fetch(`${BASE_URL_games}`)
  const data = await res.json()
  return { props: { data } }
}

const GamesWrapper = styled.div`
  width: 100%;
  padding: 5px;
`

const FilterWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
`

const Games = ({ data }) => {
  const [games, setGames] = useState(data.results)
  const [page, setPage] = useState(1)
  const [filterOption, setFilterOption] = useState(null)
  const [platformOption, setPlatformOption] = useState(null)
  const [platformOptions, setPlatformOptions] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const getGamesList = async () => {
    const newPage = page + 1
    const params = new URLSearchParams({
      ...{ page: newPage },
      ...(filterOption ? { ordering: filterOption.value } : {}),
      ...(platformOption ? { platforms: platformOption.value } : {})
    })

    const res = await fetch(BASE_URL_games + '&' + params)
    const data = await res.json()

    if (data.next) {
      setGames((!page && (filterOption || platformOption)) ? data.results : [...games, ...data.results])
    } else {
      setHasMore(false)
    }
    setPage(newPage)
  }

  useEffect(() => {
    if (filterOption) {
      setPage(0)
      setHasMore(true)
    }
  }, [filterOption])

  useEffect(() => {
    if (platformOption) {
      setPage(0)
      setHasMore(true)
    }
  }, [platformOption])

  useEffect(() => {
    if (!page) {
      getGamesList()
    }
  }, [page])


  useEffect(() => {
    const getPlatforms = async () => {
      const res = await fetch(BASE_URL_platforms)
      const data = await res.json()
      setPlatformOptions(data.results.map(item => ({ value: item.id, label: item.name })))
    }
    getPlatforms()
  }, [])

  return (
    <GamesWrapper>
      <SearchInput />
      <FilterWrapper>
        <Select
          id={1}
          instanceId={1}
          inputId={1}
          defaultValue={'Фильтр'}
          onChange={setFilterOption}
          options={[
            { value: '-rating', label: 'Рейтинг +' },
            { value: 'rating', label: 'Рейтинг -' },
            { value: '-released', label: 'Дата релиза +' },
            { value: 'released', label: 'Дата релиза -' }
          ]}
        />
        <Select
          id={2}
          instanceId={2}
          inputId={2}
          defaultValue={'Платформа'}
          onChange={setPlatformOption}
          options={platformOptions}
        />
      </FilterWrapper>
      <GameCardList games={games} getMoreGames={getGamesList} hasMore={hasMore} />
    </GamesWrapper>
  )
}

export default Games


// //queueTime([10,2,3,3], 2)

// function queueTime(arr, n) {
//   let counter = 0
//   let cassa = new Array(n).fill(0)
  
//   arr.forEach(item=>{
//     let min = Math.min(...[cassa])
//      cassa[cassa.findIndex(min)] = cassa[cassa.findIndex(min)] + item
//   })
//   console.log(cassa)
   
// }
// //([2,3,10], 2)
// queueTime([2,3,10],2)

// //[12,3]