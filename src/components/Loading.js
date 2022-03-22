import React from 'react';
import styled from 'styled-components';

export default function Loading() {
  return (
    <>
      <WholeContainer />
    </>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  height: 65px;
  max-width: 700px;
  margin-top: 8px;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding-left: 20px;

  :after {
    content: '검색중...';
    color: #bdbdbd;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: -0.018em;
  }
`;
