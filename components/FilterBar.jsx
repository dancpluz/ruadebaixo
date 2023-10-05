'use client'

import { useCallback } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '@/public/assets/icons/search.svg'
import { productTypes,productTags,productQualities,productDrops } from '@/sanity/schemas/product';
import TagRemovable from './TagRemovable';
import Accordion from './Accordion';
import { useStateContext } from '@/context/StateContext';
import { useSearchParams } from 'next/navigation';


const Container = styled.div`
  position: sticky;
  top: 120px;
  min-width: 360px;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 30px;
  margin-bottom: 40px;
`;

const SearchField = styled(TextField)`
  width: 100%;
  .MuiInputBase-input {
    font-family: 'Clash Display', sans-serif;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const SearchIcon = styled(Image)`
  height: 24px;
  width: 24px;
  margin-right: 8px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: ${props => props.selected ? 'none' : 'underline'};
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  color: ${({ theme }) => theme.colors.dark};
`;

const FilterText = styled.p`
  font-size: 18px;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 20px;
  row-gap: 10px;
`;

export default function FilterBar() {
  const searchParams = useSearchParams();
  const selectedTags = {
    tipo: searchParams.get('tipo')?.split(','),
    categoria: searchParams.get('categoria')?.split(','),
    qualidade: searchParams.get('qualidade')?.split(','),
    drop: searchParams.get('drop')?.split(',')
  }
  //console.log(selectedTags.tipo ? selectedTags.tipo.includes('Camiseta') : false);
  //const { selectedTags, setSelectedTags } = useStateContext();

  const createQueryString = 
    (name,value) => {
      const params = new URLSearchParams(searchParams)
      if (params.has(name)) {
        if (params.get(name).split(',').includes(value)) return params.toString();
        params.set(name,[params.get(name),value])
      } else {
        params.set(name, value)
      }

      return params.toString()
    }
  
  return (
    <Container>
      <SearchDiv> 
        <SearchField variant="standard" />
        <SearchIcon src={searchIcon} alt={'Procurar'} />
      </SearchDiv>
      <Accordion title={'Tipo'}>
        <FilterDiv>
          {productTypes.map((item, n) => (
            <StyledLink key={n + item.value} selected={selectedTags.tipo?.includes(item.value)} href={`?${createQueryString('tipo', item.value)}`}>
              <FilterText>
                {item.value}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Categoria'}>
        <FilterDiv>
          {productTags.map((item,n) => (
            <StyledLink key={n + item.value} selected={selectedTags.categoria?.includes(item.value)} href={`?${createQueryString('categoria', item.value)}`}>
              <FilterText>
                {item.value}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Qualidade'}>
        <FilterDiv>
          {productQualities.map((item,n) => (
            <StyledLink key={n + item.value} selected={selectedTags.qualidade?.includes(item.value)} href={`?${createQueryString('qualidade', item.value)}`}>
              <FilterText>
                {item.value}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Drop'}>
        <FilterDiv>
          {productDrops.map((item,n) => (
            <StyledLink key={n + item.value} selected={selectedTags.drop?.includes(item.value)} href={`?${createQueryString('drop', item.value)}`}>
              <FilterText>
                {item.value}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      {/* <Accordion title={'Preço'}>
        <FilterDiv>
          {
            // Input de numero para preço
          }
        </FilterDiv>
      </Accordion> */}
      <TagRemovable searchParams={searchParams} selectedTags={selectedTags} />
    </Container>
  )
}


