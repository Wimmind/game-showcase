import GameCardList from '../components/GameCardList';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Select from 'react-select';
import SearchInput from '../components/SearchInput';

export const getStaticProps = async () => {
  const gamesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}games?key=${process.env.NEXT_PUBLIC_KEY}`);
  const gamesData = await gamesResponse.json();

  const platformsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}platforms?key=${process.env.NEXT_PUBLIC_KEY}`)
  const platformsData = await platformsResponse.json()

  return { props: { data: gamesData, platformOptions: platformsData.results.map(item => ({ value: item.id, label: item.name })) } }
}

const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
`

const SelectsWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
`

const Games = ({ data, platformOptions }) => {
  const [games, setGames] = useState(data.results);
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState(null);
  const [platformOption, setPlatformOption] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const getGamesList = async () => {
    const newPage = page + 1
    const params = new URLSearchParams({
      ...{ page: newPage },
      ...(filterOption ? { ordering: filterOption.value } : {}),
      ...(platformOption ? { platforms: platformOption.value } : {})
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}games?key=${process.env.NEXT_PUBLIC_KEY}` + '&' + params);
    const data = await res.json();

    if (data.next) {
      setGames((!page && (filterOption || platformOption)) ? data.results : [...games, ...data.results]);
    } else {
      setHasMore(false);
    }
    setPage(newPage);
  }

  useEffect(() => {
    if (filterOption) {
      setPage(0);
      setHasMore(true);
    }
  }, [filterOption])

  useEffect(() => {
    if (platformOption) {
      setPage(0);
      setHasMore(true);
    }
  }, [platformOption])

  useEffect(() => {
    if (!page) {
      getGamesList();
    }
  }, [page])

  return (
    <Wrapper>
      <SearchInput searchUrl={`${process.env.NEXT_PUBLIC_BASE_URL}games?key=${process.env.NEXT_PUBLIC_KEY}`} />
      <SelectsWrapper>
        <Select
          id={1}
          instanceId={1}
          inputId={1}
          placeholder={'Фильтр'}
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
          placeholder={'Платформа'}
          onChange={setPlatformOption}
          options={platformOptions}
        />
      </SelectsWrapper>
      <GameCardList games={games} getMoreGames={getGamesList} hasMore={hasMore} />
    </Wrapper>
  )
}

export default Games