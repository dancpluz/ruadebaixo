'use client'

import styled from 'styled-components';
// import TextField from '@mui/material/TextField';
// import Image from 'next/image';
import Link from 'next/link';
//import searchIcon from '@/public/assets/icons/search.svg'
//import { productTypes,productTags,productQualities,productDrops } from '@/sanity/schemas/product';
import TagRemovable from './TagRemovable';
import Accordion from './Accordion';
import { useSearchParams } from 'next/navigation';

const Container = styled.div`
  position: sticky;
  top: 120px;
  max-width: 320px;
  min-width: 320px;
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;

  @media ${ ({ theme }) => theme.sizes.small } {
    display: ${props => props.show ? 'none' : ''};
    width: 100%;
    max-width: none;
    min-width: none;
  }
`;

// const SearchDiv = styled.div`
//   display: flex;
//   align-items: end;
//   width: 100%;
//   height: 30px;
//   margin-bottom: 40px;
// `;

// const SearchField = styled(TextField)`
//   width: 100%;
//   .MuiInputBase-input {
//     font-family: 'Clash Display', sans-serif;
//     color: ${({ theme }) => theme.colors.dark};
//   }
// `;

// const SearchIcon = styled(Image)`
//   height: 24px;
//   width: 24px;
//   margin-right: 8px;
//   cursor: pointer;
// `;

const StyledLink = styled(Link)`
  text-decoration: ${props => props.selected ? 'none' : 'underline'};
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  pointer-events: ${props => props.selected ? 'none' : ''};
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

export default function FilterBar({ show, options: { productTypes,productSizes, productCategory, productQualities, productDrops } }) {
  const searchParams = useSearchParams();
  const selectedTags = {
    tipo: searchParams.get('tipo')?.split(','),
    tamanho: searchParams.get('tamanho')?.split(','),
    categoria: searchParams.get('categoria')?.split(','),
    qualidade: searchParams.get('qualidade')?.split(','),
    drop: searchParams.get('drop')?.split(',')
  }

  const createQueryString = (name,value) => {
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
    <Container show={show}>
      {/* <SearchDiv> 
        <SearchField variant="standard" />
        <SearchIcon src={searchIcon} alt={'Procurar'} />
      </SearchDiv> */}
      <Accordion title={'Tipo'}>
        <FilterDiv>
          {productTypes.map((item, n) => (
            <StyledLink key={n + item} selected={selectedTags.tipo?.includes(item)} href={`?${createQueryString('tipo', item)}`}>
              <FilterText>
                {item}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Tamanho'}>
        <FilterDiv>
          {productSizes.map((item,n) => (
            <StyledLink key={n + item} selected={selectedTags.tamanho?.includes(item)} href={`?${createQueryString('tamanho',item)}`}>
              <FilterText>
                {item}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Categoria'}>
        <FilterDiv>
          {productCategory.map((item,n) => (
            <StyledLink key={n + item} selected={selectedTags.categoria?.includes(item)} href={`?${createQueryString('categoria', item)}`}>
              <FilterText>
                {item}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Qualidade'}>
        <FilterDiv>
          {productQualities.map((item,n) => (
            <StyledLink key={n + item} selected={selectedTags.qualidade?.includes(item)} href={`?${createQueryString('qualidade', item)}`}>
              <FilterText>
                {item}
              </FilterText>
            </StyledLink>
          ))}
        </FilterDiv>
      </Accordion>
      <Accordion title={'Drop'}>
        <FilterDiv>
          {productDrops.map((item,n) => (
            <StyledLink key={n + item} selected={selectedTags.drop?.includes(item)} href={`?${createQueryString('drop', item)}`}>
              <FilterText>
                {item}
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


