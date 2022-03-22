import React, { useState } from 'react';
import styled from 'styled-components';

export default function SearchBar({ handleisLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = e => {
    setInputValue(e.target.value);
    handleisLoading(e.target.value);
  };

  return (
    <WholeContainer>
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
      <input
        type="text"
        value={inputValue}
        placeholder="질환명을 입력해 주세요."
        onChange={handleInputValue}
      />
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 1.125rem;
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
