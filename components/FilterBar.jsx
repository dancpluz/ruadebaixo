import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import searchIcon from '../assets/search.svg'
import plusIcon from '../assets/plus.svg'
import { productTypes, productTags, productQualities } from '../schemas/product';
import RemovableTag from '../components/RemovableTag';
import { Accordion, AccordionSummary, AccordionDetails, Plus } from '../components/Info'; 
import { useStateContext } from '../context/StateContext';

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
    color: black;
  }
`;

const SearchIcon = styled(Image)`
  height: 24px;
  width: 24px;
  margin-right: -3px;
`;

const FilterText = styled.p`
  color: black;
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
        <SearchIcon src={searchIcon} />
      </SearchDiv>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Tipo</AccordionSummary>
        <AccordionDetails>
          <FilterDiv>
            {productTypes.list.map((item) => (
              <FilterText key={item.value} selected={selectedTags.includes(item.title)} onClick={() => handleSelectFilter(item.title)}>{item.title}</FilterText>
            ))}
          </FilterDiv>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Categoria</AccordionSummary>
        <AccordionDetails>
          <FilterDiv>
            {productTags.list.map((item) => (
              <FilterText key={item.value} selected={selectedTags.includes(item.title)} onClick={() => handleSelectFilter(item.title)}>{item.title}</FilterText>
            ))}
          </FilterDiv>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Qualidade</AccordionSummary>
        <AccordionDetails>
          <FilterDiv>
            {productQualities.list.map((item) => (
              <FilterText key={item.value} selected={selectedTags.includes(item.title)} onClick={() => handleSelectFilter(item.title)}>{item.title}</FilterText>
            ))}
          </FilterDiv>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<Plus alt='plus' src={plusIcon} />}>Preço</AccordionSummary>
        <AccordionDetails>
          <FilterDiv>
            {
              // Input de numero para preço
            }
          </FilterDiv>
        </AccordionDetails>
      </Accordion>
      <RemovableTag tags={selectedTags} ></RemovableTag>
    </Container>
  )
}


