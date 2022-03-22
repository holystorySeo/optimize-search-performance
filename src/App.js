import React from 'react';
import styled from 'styled-components';
import './App.css';

export default function App() {
  return (
    <WholeContainer>
      <div className="header"></div>
      <div className="main">
        <SearchDiv>
          <div className="search-text"></div>
        </SearchDiv>
      </div>
      <div className="bottom"></div>
      <div className="footer"></div>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    flex: 1 0 0;
  }

  .main {
    flex: 10 0 0;
    background: #cae9ff;
    padding-top: 80px;
  }

  .bottom {
    flex: 2 0 0;
    background: #369efc;
  }

  .footer {
    flex: 3 0 0;
    background: #2d3d50;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 193px;
  border: 1px solid black;

  .search-text {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    ::before {
      content: '국내 모든 임상시험 검색하고';
    }
    ::after {
      content: '온라인으로 참여하기';
    }
  }
`;
