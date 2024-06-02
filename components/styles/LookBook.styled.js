import styled from 'styled-components';
import Image from 'next/image';

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-overflow: ellipsis;
  gap: 8px;
  h1, h2 {
    white-space: nowrap;
  }
`;

export const Collection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BigImageDiv = styled.div`
  position: fixed;
  display: ${(props) => props.showOverlay};
  background-color: rgba(0,0,0,0.7);
  z-index: 2;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const BigImage = styled(Image)`
  z-index: 3;
  max-height: 800px;
  width: auto;
  transform: translate(0, 10%);
  position: fixed;
  object-fit: scale-down;
`;

export const Gallery = styled.div`
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  &::after {
    content: '';
    flex-grow: 999;
  }
`;

export const PhotoDiv = styled.div`
  position: relative;
  height:  auto;
  width: 300px;
  aspect-ratio: 2/3;
  cursor: pointer;
  transition: all .20s ease;
  flex: 1 1 auto;

  &:hover {
    filter: drop-shadow(0px 7px 29px rgba(100, 100, 111, 0.2));
    transform: scale(1.05);
  }

`;

export const Photo = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  vertical-align: middle;
`;