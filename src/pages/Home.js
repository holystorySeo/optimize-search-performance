import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchDiv from '../components/organisms/SearchDiv';
import Loading from '../components/atoms/Loading';
import NoResult from '../components/atoms/NoResult';
import SuggestionList from '../components/molecules/SuggestionList';
import setItemsTo from '../utils/setItemToLocalStorage';
import getItemFrom from '../utils/getItemFromLocalStorage';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [isIdxSelected, setIsIdxSelected] = useState();

  const handleSuggestion = inputValue => {
    setInputValue(inputValue);
    if (inputValue === '') {
      setIsLoading(false);
      setShowResult(false);
      setIsIdxSelected();
    } else {
      suggestionSearch(inputValue);
    }
  };

  const suggestionSearch = async item => {
    setIsLoading(true);
    setShowResult(false);
    const resultData = getItemFrom(item);

    if (resultData === null) {
      console.log('API호출');
      await axios({
        method: 'get',
        url: `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${item}`,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        setIsLoading(false);
        setShowResult(true);
        const searchData = res.data.slice(0, 7).map(el => {
          return el.name;
        });
        setSuggestionList(searchData);
        setItemsTo(item, searchData);
      });
    } else {
      console.log('로컬스토리지 호출');
      setIsLoading(false);
      setShowResult(true);
      setSuggestionList(resultData);
    }
  };

  const handleArrowKey = e => {
    const maxId = suggestionList.length;

    if (e.key === 'Enter') {
      setInputValue(suggestionList[isIdxSelected]);
      if (inputValue !== '') {
        setIsIdxSelected();
        setShowResult(false);
        window.location.replace(
          `https://clinicaltrialskorea.com/studies?condition=${suggestionList[isIdxSelected]}`
        );
      }
    }

    if (e.key === 'ArrowDown') {
      if (isIdxSelected === undefined) {
        // 맨처음 키보드 down 할 때 드랍다운 리스트 인덱스 0번을 선택한다.
        setIsIdxSelected(0);
      } else if (isIdxSelected !== undefined) {
        // 두번째 키보드 down 부터
        if (maxId === isIdxSelected + 1) {
          // maxId와 isIdxSelected 값의 차이가 1일 경우 인덱스는 0을 설정한다.
          setIsIdxSelected(0); // isIdxSelected의 값은 0이 된다.
        } else {
          // 나머지의 경우에는 idx를 1씩 증가시킨다.
          setIsIdxSelected(isIdxSelected + 1);
        }
      }
    }

    if (e.key === 'ArrowUp') {
      if (isIdxSelected === undefined) {
        setIsIdxSelected(maxId - 1);
      } else if (isIdxSelected !== undefined) {
        if (isIdxSelected === 0) {
          setIsIdxSelected(maxId - 1);
        } else {
          setIsIdxSelected(isIdxSelected - 1);
        }
      }
    }
  };

  const handleSelected = idx => {
    setInputValue(suggestionList[idx]);
    setIsIdxSelected();
    setShowResult(false);
  };

  const handleSearch = () => {
    if (inputValue !== '') {
      setIsIdxSelected();
      setShowResult(false);
      window.location.replace(
        `https://clinicaltrialskorea.com/studies?condition=${inputValue}`
      );
    }
  };

  return (
    <WholeContainer>
      <div className="header"></div>
      <div className="main">
        <SearchDiv
          handleSuggestion={handleSuggestion}
          handleArrowKey={handleArrowKey}
          inputValue={inputValue}
          handleSearch={handleSearch}
        />
        {isLoading ? (
          <Loading />
        ) : showResult ? (
          suggestionList.length === 0 ? (
            <NoResult />
          ) : (
            <SuggestionList
              list={suggestionList}
              isIdxSelected={isIdxSelected}
              handleSelected={handleSelected}
            />
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
