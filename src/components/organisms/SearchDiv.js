import React from 'react';
import styled from 'styled-components';
import SearchBar from '../molecules/SearchBar';
import SearchBtn from '../atoms/SearchBtn';

export default function SearchDiv({
  handleSuggestion,
  handleKeyDown,
  inputValue,
  handleSearch,
}) {
  return (
    <WholeContainer>
      <div className="search-text" />
      <div className="search-section">
        <SearchBar
          handleSuggestion={handleSuggestion}
          handleKeyDown={handleKeyDown}
          inputValue={inputValue}
        />
        <SearchBtn handleSearch={handleSearch} />
      </div>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  height: 193px;

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
