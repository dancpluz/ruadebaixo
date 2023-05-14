import styled from 'styled-components';
import images from '../../assets/photos/index.js';
import Image from 'next/image';

const Container = styled.div`
  
`;

const Gallery = styled.div`

  display: flex;
  flex-flow: row wrap;
  margin-left: -8px; /* Adjustment for the gutter */
  width: 100%;
`;

const PhotoDiv = styled.div`
  flex: auto;
  height: 250px;
  min-width: 150px;
  margin: 0 8px 8px 0;
  transition: all .20s ease;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transform: scale(1.05);
  }
`;

const Photo = styled(Image)`
  width: 360px;
  height: 100%;
  object-fit: contain;
`;

export default function LookBook() {  

  return (
    <Gallery>
      {images.map((image) => (
        <PhotoDiv key=''>
          <Photo key='' src={image} />
        </PhotoDiv>
      ))}
    </Gallery>
  )
}
