import React from 'react';
import styled from 'styled-components';
import './App.css';

export default function App() {
  return (
    <WholeContainer>
      <div className="header"></div>
      <div className="main">
        <SearchDiv>
          <div className="search-text" />
          <div className="search-section">
            <SearchBar>
              <svg
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={pathD} fill="#32383E"></path>
              </svg>
              <input type="text" placeholder="질환명을 입력해 주세요."></input>
            </SearchBar>
            <SearchBtn></SearchBtn>
          </div>
        </SearchDiv>
      </div>
      <div className="bottom"></div>
      <div className="footer"></div>
    </WholeContainer>
  );
}
const pathD =
  'M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z';

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
    display: flex;
    justify-content: center;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  height: 193px;
  /* border: 1px solid black; */

  @media screen and (min-width: 1040px) {
    max-width: 700px;
  }

  .search-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2.125rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.6;
    ::before {
      content: '국내 모든 임상시험 검색하고';
    }
    ::after {
      content: '온라인으로 참여하기';
    }
  }

  .search-section {
    width: 100%;
    height: 65px;
    border-radius: 42px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: 400;

  input {
    width: 100%;
    border: 0;
    min-width: 0;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    padding-left: 12px;
    cursor: text;

    ::-webkit-input-placeholder {
      color: #bdbdbd;
    }

    :focus {
      outline: none;
    }
  }
`;

const SearchBtn = styled.button`
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

  ::after {
    content: '검색';
  }
`;
