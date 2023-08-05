'use client'

import styled from 'styled-components';
import Image from 'next/image'

export const MainContainer = styled.div`
  padding-bottom: 70px;
`;

export const Logo = styled(Image)`
  vertical-align: top;
  margin: 120px 0 0 120px;
`;

export const TopImage = styled(Image)`
  margin-left: 20vw;
`;

export const Caption = styled.div`
  width: 760px;
  border-bottom: 1px solid black;
  margin-top: 60px;
  padding-bottom: 10px;
  h4 {
    margin-left: 120px;
    text-align: right;
  }
`;

export const LeftImage = styled(Image)`
  vertical-align: top;
  margin-left: 150px;
  margin-top: 100px;
`;

export const RightImage = styled(Image)`
  margin-top: -20vw;
  margin-left: 70vw;
`;