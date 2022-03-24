import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function SuggestionList({
  list,
  handleSelected,
}) {
  const selectedIdx = useSelector(state => state.searching.selectedIdx);
  console.log(selectedIdx);
  return (
    <WholeContainer>
      {list.map((el, idx) => {
        return (
          <div
            className={`list-section ${
              selectedIdx === idx ? 'selected--focused' : ''
            }`}
            key={idx}
            onClick={() => handleSelected(idx)}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z"
                fill="#32383E"
              ></path>
            </svg>
            <div className="list-item" key={idx}>
              {el}
            </div>
          </div>
        );
      })}
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  width: 100%;
  max-width: 700px;
  max-height: 358px;
  margin-top: 8px;
  border-radius: 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 16px;
  cursor: pointer;

  :before {
    content: '추천 검색어';
    color: #bdbdbd;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: -0.018em;
  }

  .list-section {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 1.125rem;
    font-weight: 400;

    &:hover {
      background: #e6e6e6;
    }

    &.selected--focused {
      background: #e6e6e6;
      border-radius: 10px;
    }
  }

  .list-item {
    padding-left: 12px;
    font-size: 1rem;
    font-weight: 400;
  }
`;
