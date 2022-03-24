import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIdx, insertIdx, updateSuggestionList } from '../store/searchSlice';
import styled from 'styled-components';
import axios from 'axios';
import SearchDiv from '../components/organisms/SearchDiv';
import Loading from '../components/atoms/Loading';
import NoResult from '../components/atoms/NoResult';
import SuggestionList from '../components/molecules/SuggestionList';
import setItemsTo from '../utils/setItemToLocalStorage';
import getItemFrom from '../utils/getItemFromLocalStorage';
import { debounce } from 'lodash';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initShowResult = useSelector(state => state.searching.showResult);
  const [showResult, setShowResult] = useState(initShowResult);
  const suggestionList = useSelector(state => state.searching.suggestionList);
  const selectedIdx = useSelector(state => state.searching.selectedIdx);
  const dispatch = useDispatch();

  console.log(`inputValue=${inputValue}, showResult=${showResult}`);

  const exeSuggestionSearch = useCallback(
    debounce((item) =>
      suggestionSearch(item), 500), []
  );

  const handleSuggestion = inputValue => {
      setInputValue(inputValue);
      exeSuggestionSearch(inputValue);
  };

  const suggestionSearch = async item => {
    if(item === '') {
      setIsLoading(false);
      setShowResult(false);
      dispatch(insertIdx(-2));
    } else {
      setIsLoading(true);
      const resultData = getItemFrom(item);

      if (resultData === null) {
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
          dispatch(updateSuggestionList(searchData));
          setItemsTo(item, searchData);
        });
      } else {
        setIsLoading(false);
        setShowResult(true);
        dispatch(updateSuggestionList(resultData));

      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Backspace') {
      dispatch(insertIdx(-2));
    }

    if (e.key === 'Enter') {
      if (selectedIdx === -2) {
        if (inputValue !== '') {
  
          dispatch(insertIdx(-2));
          setShowResult(false);
          window.location.replace(
            `https://clinicaltrialskorea.com/studies?condition=${suggestionList[selectedIdx]}`
          );
        }
      } else {
        setInputValue(suggestionList[selectedIdx]);
        if (inputValue !== '') {
  
          dispatch(insertIdx(-2));
          setShowResult(false);
          window.location.replace(
            `https://clinicaltrialskorea.com/studies?condition=${suggestionList[selectedIdx]}`
          );
        }
      }
    }

    if (e.key === 'ArrowDown') {
      if (suggestionList.length === selectedIdx + 1) {
        // maxId와 selectedIdx 값의 차이가 1일 경우 인덱스는 0을 설정한다.
        dispatch(insertIdx(0)); // selectedIdx의 값은 0이 된다.
      } else {
        // 나머지의 경우에는 idx를 1씩 증가시킨다.
        dispatch(updateIdx(1));
      }
    }

    if (e.key === 'ArrowUp') {
      if (selectedIdx === 0) {
        dispatch(insertIdx(suggestionList.length - 1))
      } else if (selectedIdx === -2) {
        return false;
      } else {
        dispatch(insertIdx(selectedIdx - 1))
      }
    }
  };

  const handleSelected = idx => {
    setInputValue(suggestionList[idx])
    dispatch(insertIdx(-2));
    setShowResult(false);
  };

  const handleSearch = () => {
    if (inputValue !== '') {
      dispatch(insertIdx(-2));
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
          handleKeyDown={handleKeyDown}
          inputValue={inputValue}
          handleSearch={handleSearch}
        />
        {isLoading ? (
          <Loading />
        ) : showResult ? (
          suggestionList.length === 0 ? (
            <NoResult />
          ) : (
            <SuggestionList handleSelected={handleSelected}
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
