import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchDiv from '../components/SearchDiv';
import Loading from '../components/Loading';
import NoResult from '../components/NoResult';
import SuggestionList from '../components/SuggestionList';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [suggestionList, setSuggestionList] = useState([]);

  const handleSearch = inputValue => {
    if (inputValue === '') {
      setIsLoading(false);
      setShowResult(false);
    } else {
      listSearch(inputValue);
    }
  };

  const listSearch = async item => {
    console.log(searchItem);
    setIsLoading(true);
    setNoResult(false);
    setShowResult(false);
    await axios({
      method: 'get',
      url: `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${item}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      setIsLoading(false);
      setShowResult(true);
      const searchData = res.data.slice(0, 7);
      console.log(searchData);
      setSuggestionList(searchData);
    });
  };

  return (
    <WholeContainer>
      <div className="header"></div>
      <div className="main">
        <SearchDiv handleSearch={handleSearch} />
        {isLoading ? (
          <Loading />
        ) : showResult ? (
          suggestionList.length === 0 ? (
            <NoResult />
          ) : (
            <SuggestionList list={suggestionList} />
          )
        ) : (
          ''
        )}
      </div>
      <div className="bottom"></div>
      <div className="footer"></div>
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100vw;
  height: 1050px;
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
    flex-direction: column;
    align-items: center;
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
