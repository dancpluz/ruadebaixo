'use client'

import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import searchIcon from '@/public/assets/icons/search.svg'
import { productTypes,productTags,productQualities,productDrops } from '@/sanity/schemas/product';
import TagRemovable from './TagRemovable';
import Accordion from './Accordion';
import { useStateContext } from '@/context/StateContext';

const Container = styled.div`
  width: 360px;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: end;
  width: 100%;
  height: 40px;
  margin-bottom: 40px;
`;

const SearchField = styled(TextField)`
  flex-grow: 1;
  .MuiInputBase-input {
    font-family: 'Clash Display', sans-serif;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const SearchIcon = styled(Image)`
  height: 24px;
  width: 24px;
  margin-right: -3px;
`;

const FilterText = styled.p`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 18px;
  text-decoration: ${props => props.selected ? 'none' : 'underline'};
  cursor: ${props => props.selected ? 'default' : 'pointer'};;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 20px;
  row-gap: 10px;
`;

export default function FilterBar() {
  const { selectedTags, setSelectedTags } = useStateContext();

  function handleSelectFilter(item) {
    if (!selectedTags.includes(item)) {
      setSelectedTags((oldArray) => [...oldArray,item]);
    }
    
    // Adicionar lógica de filtragem na busca
  }
  
  return (
    <Container>
      <SearchDiv> 
        <SearchField variant="standard" />
        <SearchIcon src={searchIcon} alt={'Procurar'} />
      </SearchDiv>
      <Accordion title={'Tipo'}>
        <FilterDiv>
          {productTypes.map((item) => (
            <FilterText key={item.value} selected={selectedTags.includes(item.value)} onClick={() => handleSelectFilter(item.value)}>{item.value}</FilterText>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Categoria'}>
        <FilterDiv>
          {productTags.map((item) => (
            <FilterText key={item.value} selected={selectedTags.includes(item.value)} onClick={() => handleSelectFilter(item.value)}>{item.value}</FilterText>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Qualidade'}>
        <FilterDiv>
          {productQualities.map((item) => (
            <FilterText key={item.value} selected={selectedTags.includes(item.value)} onClick={() => handleSelectFilter(item.value)}>{item.value}</FilterText>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Drop'}>
        <FilterDiv>
          {productDrops.map((item) => (
            <FilterText key={item.value} selected={selectedTags.includes(item.value)} onClick={() => handleSelectFilter(item.value)}>{item.value}</FilterText>
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
      <TagRemovable />
    </Container>
  )
}


