# 검색어 추천이 있는 검색창 만들기
<img src="https://user-images.githubusercontent.com/87353284/159841659-f7caea4e-7f3f-4731-8d3a-92ac3efc10de.gif" width="50%">


## 프로젝트 소개
- 검색어 추천이 있는 검색창 만들기
- 한국임상정보(https://clinicaltrialskorea.com/) 검색 영역 클론

## 배포 링크
[https://wanted-codestates-project-9.vercel.app/](https://wanted-codestates-project-9.vercel.app/)

## 개발 환경
  |기술 스택|실행 방법|의존성 모듈|
  |:-:|:-:|:-:|
  |JavaScript|Repostiory clone : 터미널 창에서 git clone|create-react-app, styled-components|
  |React.JS |Dependency install : npm install|react-redux, @redux-toolkit 
  |Redux|Execution : npm start|react-router-dom, axios|

## 개발 기능
- 로컬 캐싱: LocalStorage에 검색어를 저장하여 동일 검색어의 경우에 활용(expireTime 30분, 파일명: utils/getItemFromLocalStorage.js, utils/setItemToLocalStorage.js)
  - 만료시간은 최초 저장시 getTime()에 1.8e6 밀리세컨드(30분)를 가산
  - 로컬 스토리지에서 동일 검색어 발견시 현재 시간과 만료시간을 비교하여 삭제 혹은 활용 여부 결정
  
    <img src="https://user-images.githubusercontent.com/87353284/159971857-9a5cd6cd-e810-4462-ba6e-367cb36e4d72.png" width="70%">

- API 호출 최적화: lodash의 debounce를 활용하여 0.5초 지연 입력으로 API호출 과부하 방지(파일명: pages/home.js)
  - 검색어 API 조회에 총 3개의 함수 이용. 1)인풋 입력에 따라 onChange 함수 트리거. 2)debounce를 담고 있는 콜백 함수 실행. 3)API 호출과 결과값에 따른 상태값을 변경하는 함수 실행
  
    <img src="https://user-images.githubusercontent.com/87353284/159971364-c3cc4704-0d18-4df4-85aa-1fc06e362eb6.gif" width="100%">
    
- 키보드 추천어 이동
  - onKeyDown 핸들러로 키보드 이동에 따른 추천어 리스트 인덱스 리덕스 툴킷으로 업데이트(리덕스 파일명: store/searchSlice.js)
  - 상태관리 하는 인덱스 값과 map으로 렌더링된 리스트의 인덱스 값이 같으면 HTML태그의 class를 추가하여 해당 추천어만 하이라이트 효과
  
    <img src="https://user-images.githubusercontent.com/87353284/159979803-fa82c941-95d7-4d27-8cea-3342b61c1463.gif" width="50%">

- AutoComplete
  - 추천어 리스트에서 키보드 이동 후 Enter 누르는 경우와 마우스 Click 한 경우 모두 인풋창에 AutoComplete 가능  
  - Enter와 Click 이벤트 발생시의 추천어 리스트의 인덱스 값을 인풋창의 value값으로 업데이트
  - 키보드 이동하면서 인풋창의 값의 변경 기능도 구현이 가능하나 이동하기 전 입력한 검색어의 보존을 위해 구현하지 않음
  
    <img src="https://user-images.githubusercontent.com/87353284/159981314-6f4b819f-42df-464d-b3ba-cbc68ef9b387.gif" width="50%">

## 프로젝트 구현 방법
- Redux Toolkit으로 전역 상태 관리(Original Redux 보다 덜 구현 환경이 복잡하지 않아서 사용함)
  - 본 프로젝트에서 상태는 총 5개이며, 이중에서 props Drilling이 발생하는 상태는 총 3개.
    1) 배열 인덱스 상태값 - 추천어 배열 리스트에서 현재 특정하고 있는 배열 인덱스의 상태값은 키보드 이동과 AutoComplete을 위해 전역 관리
    2) 추천어 리스트 상태값 - 추천어 리스트 렌더링 컴포넌트 분리로 전역 관리
    3) 인풋창 입력값 - props Drilling 발생하지만 Depth가 깊지 않고 setIsLoading, SetShowResult 등의 다른 상태값과 API 호출의 비동기 과정에서 하나의 페이지(Home.js)에서 상태값의          변경이 빈번하여 로컬로 상태 관리
  - 검색 영역만을 본다면 상태값을 전역에서 관리할 상태관리 툴의 도입은 크게 필요하지 않는 것으로 판단되나, 추후 기능의 확장성을 고려하여 도입하는 것이 좋다고 여겨짐

- Atomic component 구조
  - 원자(로딩, 검색결과 없음, 검색 버튼), 분자(검색창, 추천어 리시트), 유기체(검색 영역)<br>
    
    <img src="https://user-images.githubusercontent.com/87353284/159987217-254ae5bf-1cfe-4bce-8584-55e67cd768e4.png">

## 에러 핸들링
1. API 서버 환경 설정 변화에 따른 데이터 호출 불가 문제
  - 정상 작동하던 검색 기능 아래 오류 메세지 발생, CORS 에러
   <img src="https://user-images.githubusercontent.com/87353284/168730705-cfb214b9-1d5d-4abe-aa58-6f708e0605de.png" width="80%">
   
   <img src="https://user-images.githubusercontent.com/87353284/168731285-7c1e5816-4f03-4e9c-8c21-498b836c6561.png">
   
   <img src="https://user-images.githubusercontent.com/87353284/168731398-a2f0ed55-7d1d-4f98-b0ce-15000e7116c8.png" width="50%">
   
   #### 해결시도1) http-proxy-middleware 활용 (해결안됨)
   - src 폴더에 setupProxy.js 작성
   ```jsx
   const express = require('express');
   const { createProxyMiddleware } = require('http-proxy-middleware');
   
   const app = express();

   module.exports = function(app){
   app.use(
     createProxyMiddleware('/api', {
        target: 'https://api.clinicaltrialskorea.com/',
        changeOrigin: true
       })
      )
    };
    
    
   app.listen(3000);
   ```
   - axios 요청시에 /api로 호출되는 부분이 proxy 서버로 설정된다고 함
   ```jsx
    await axios({
          method: 'get',
          url: `/api/v1/search-conditions/?format=json&name=${item}`,
          headers: {
            'Content-Type': 'application/json',
          },
   ```
   - 동일한 404 not found 메세지 발생하여 해결되지 않음

   #### 해결시도2) herokuapp(헤로쿠)에 proxy 서버 만들어서 활용(해결)
   [헤로쿠 proxy 서버 주소 생성](https://nhj12311.tistory.com/278)
   - defaultClient.js
   ```jsx
   import axios from 'axios';

   const defaultClient = axios.create({
   baseURL:
    'https://daground-proxy.herokuapp.com/https://api.clinicaltrialskorea.com',
    });

   export default defaultClient;
   ```
   
   - Home.js axios 호출 영역
   ```jsx
   import axios from '../utils/defaultClient';
   
    await axios({
    method: 'get',
    url: `/api/v1/search-conditions/?format=json&name=${item}`,
    headers: {
      'Content-Type': 'application/json',
    },
   ```
   
   - 정상 작동
   <img src="https://user-images.githubusercontent.com/87353284/168737025-f464facd-f10f-4ab5-9dd7-44f6867a7775.gif" width="50%">

## 어려웠던 점
- 맥북 키보드 이동 2회 중복 실행
  - 키보드 이동에서 인풋창 --> 추천어 리스트로 이동할 때 인덱스 상태값 증가의 변화가 2번 실행되었음. 프로젝트 자체의 결함이라고 생각하여 원인을 찾으려고 했으나 맥북의 키보드 결함
  - 맥북 외의 다른 컴퓨터에서는 정상작동함을 확인하였음. 안정적인 사용을 위해 인덱스 초기값을 -2로 설정하여 맥북의 결함에 대응

- 인풋창의 값이 빈배열일 경우의 상태값 처리와 debounce 적용
  - 인풋창의 값을 지울 때에도 debounce를 통한 API호출이 발생하고 호출 결과에 따라 setIsLoading과 setShowResult의 상태값이 변하게 됨
  - 인풋창을 Backspace으로 지울 때 debounce의 Delay Time과 비동기 API 호출이 완료되기 전에 인풋창의 값이 빈배열이 될 경우 setIsLoading과 setShowResult의 상태값을 false로 바뀜
  - 상태값이 false 바뀐 후에 비동기 API의 호출의 결과로 (즉, 빈배열이 되기 바로 직전의 인풋창의 값으로 API호출이 발생함) setShowResult가 true가 되어서 '검색어 없음' 이 빈배열인 상태에서 활성화된 문제가 있었음
  - inputValue 가 빈배열일 경우를 체크해서 setIsLoading과 setShowResult의 상태값을 초기화해주는 명령어를 실행하는 함수를 바꾸어 주어서 해결
  - 함수위치 변경 : 처음(debounce가 실행되는 함수) --> 나중(debounce에 의해 실행되는 함수)/ debounce에 의해 실행되는 함수에서 inputValue를 체크해서 비동기의 순차적 실행을 보장
