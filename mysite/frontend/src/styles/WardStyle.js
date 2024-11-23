import styled,  { css }  from 'styled-components';

export const WardContainer = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  width: 70vw;
  min-height: 100vh;
  padding: 7vh 0 5vh 0;

h3{
  font-family: 'Elice_bold';
}



 /* ul과 li 스타일 추가 */
.form_size {
    max-height: 100px; /* 최대 높이 설정 */
    max-width: 100%; /* 최대 너비 설정 */
    overflow-y: auto; /* 세로 스크롤 */
    overflow-x: auto; /* 가로 스크롤 */
    border: 1px solid #ccc; /* 경계선 설정 */
    border-radius: 10px;
    padding: 15px; /* 내부 여백 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    background-color: #fff; /* 배경색 설정 */
    width: 25%; /* 너비 설정 */
    margin: 20px auto; /* 위아래 여백과 자동 가로 중앙 정렬 */

    &:hover{
      border: 0.813em solid #AEDED3;
      border-radius: 5%;
    }
    
    @media screen and (max-width: 48em) {
    position: relative;
    width: 90%;

    &:hover{
      border: 0.513em solid #AEDED3;
      border-radius: 10%;
      width: 85%;
    }
    } ;
  }

  ul {
    padding: 3px 0px;
    padding-left: 0.2rem;
    list-style-type: none;
  }

  li {
    font-size: 1.2rem; /* 리스트 항목 텍스트 크기 */
    color: #333; /* 텍스트 색 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    transition: color 0.3s ease; /* 색상 변경에 애니메이션 추가 */
    border-bottom: 1px solid #ddd; /* 항목마다 구분선 추가 */
  }

  li:hover {
    color: #AEDED3 /* hover 시 색상 변경 */
  }
  
  button.list {
    background: none; /* 배경 제거 */
    border: none; /* 테두리 제거 */
    color:#333; /* 텍스트 색상 */
    font-size: 1.1em; /* 폰트 크기 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    padding: 0; /* 내부 여백 제거 */
    text-align: center; /* 텍스트 정렬 */
    
    &:hover {
       color: #6c757d;/* hover 시 색상 변경 */
    }

    &:focus {
        outline: none; /* 포커스 상태에서 아웃라인 제거 */
    }
  }
button{
  background-color: #B4A2EB;
  color: white;
  padding: 1em;
  border: none;
  border-radius: 20px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #AEDED3 /* 버튼 호버 색상 */
}

button.active {
  background-color: #AEDED3; /* 버튼 클릭 시 색상 */
}

div.blank {
  padding: 1em;
 
}

button.add {

font-family: 'Elice_bold';
  background-color: white;
  color: #9e82d8;
  padding: 1em;
  border: none;
  border-radius: 20px;
  font-size: 1.1em;
  cursor: pointer;
  

  transition: background-color 0.3s ease;
}

button.add:hover {
  background-color: white;
  color:#AEDED3;
}

button.add:active {
  background-color:#AEDED3;
}


  } ;
`;
