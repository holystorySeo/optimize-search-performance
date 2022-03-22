import React from 'react';
import styled from 'styled-components';

export default function SearchBtn() {
  return (
    <>
      <WholeContainer />
    </>
  );
}

const WholeContainer = styled.button`
  border-width: 0;
  border-top-right-radius: 42px;
  border-bottom-right-radius: 42px;
  background-color: #007be9;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.018em;
  line-height: 1.6;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 18px;
  padding-bottom: 18px;
  cursor: pointer;

  -webkit-font-smoothing: antialiased;

  ::after {
    content: '검색';
  }
`;
