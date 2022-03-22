import React, { useState } from 'react';
import styled from 'styled-components';
import SearchDiv from '../components/SearchDiv';
import Loading from '../components/Loading';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleisLoading = inputValue => {
    if (inputValue === '') {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };

  return (
    <WholeContainer>
      <div className="header"></div>
      <div className="main">
        <SearchDiv handleisLoading={handleisLoading} />
        {isLoading ? <Loading /> : ''}
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
