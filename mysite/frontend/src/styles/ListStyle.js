import styled,  { css }  from 'styled-components';

export const ListContainer = styled.div`
    overflow-y: auto; /* 세로 스크롤 */
    overflow-x: auto; /* 가로 스크롤 */

  @media (max-width: 768px) {
  }

 /* ul과 li 스타일 추가 */

  ul {
    padding: 0px 0px;
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
  


button{

  background: none; 
  color:  #6c757d;
  padding: 1em;
  border: none;
  border-radius: 20px;
  font-size: 0.8em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서는 수직으로 배치 */
    padding: 0.3em;
    font-size: 0.7em;
  }
}

button:hover {
  width: 100%;
  background-color: #AEDED3 /* 버튼 호버 색상 */
}

button.active {
  background-color: #AEDED3; /* 버튼 클릭 시 색상 */
@media (max-width: 768px) {
    display: flex;
    align-items: center;  
}
}

div.blank {
  padding: 1em;
 
}

button.add{
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  background-color:  #ccc;
  color: white;
  padding: 0.5em;
  border: none;
  border-radius: 20px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column; /* 모바일에서는 수직으로 배치 */
    padding: 0.5em; 0.7em;
    font-size: 0.8em;
    display: flex;
    justify-content: center;    /* 수평 중앙 정렬 */
    align-items: center;    
  }
  
}

button.add:hover {
  background-color: #AEDED3 /* 버튼 호버 색상 */
}

button.add.active {
  background-color: #AEDED3; /* 버튼 클릭 시 색상 */
}

/* CSS 파일 혹은 스타일 컴포넌트에 추가 */
input[type="text"] {
    width: 80%;  /* 너비를 100%로 설정하여 반응형 적용 */
    padding: 10px 15px;  /* 내부 여백을 추가하여 텍스트 공간을 확보 */
    border: 1px solid #ccc;  /* 얇은 테두리 색상 */
    border-radius: 20px;  /* 둥근 모서리 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);  /* 부드러운 그림자 */
    font-size: 16px;  /* 폰트 크기 조정 */
    outline: none;  /* 포커스 시 기본 윤곽선 제거 */
    transition: all 0.3s ease;  /* 애니메이션 추가로 포커스 효과 부드럽게 */
  
    @media (max-width: 768px) {
    width: 80%;
    flex-direction: column; /* 모바일에서는 수직으로 배치 */
    padding: 0.8em;
    font-size: 0.8em;
  }
}

input[type="text"]:focus {
    border-color: #66afe9;  /* 포커스 시 테두리 색상 강조 */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);  /* 포커스 시 그림자 강조 */
}

input[type="text"]::placeholder {
    color: #aaa;  /* 플레이스홀더 색상 */
    font-style: italic;  /* 플레이스홀더에 기울임꼴 스타일 */
}

  } ;
`;



export const  AddPatient = styled.div`
  background-color: #f4f6fc;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 1em auto;
  width: 40%;
//   max-width: 600px;
  font-family: 'Nanum Gothic', sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1em 1em;
    font-size: 0.7em;
    display: flex;
    justify-content: center;    /* 수평 중앙 정렬 */
    align-items: center;   
  }


  &:hover{
      border: 0.813em solid #AEDED3;
      border-radius: 10%;
    }
    
  @media screen and (max-width: 48em) {
    position: relative;

    &:hover{
      border: 0.3em solid #AEDED3;
      border-radius: 10%;
      width: 50%;
    }
    } ;

  button{
    background-color: #B4A2EB;
    color: white;
    padding: 1em;
    border: none;
    border-radius: 20px;
    font-size: 0.8em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    @media (max-width: 768px) {
      width: 100%;
      padding: 0.5em; 1.0 em;
      font-size: 0.9em;
      display: flex;
      justify-content: center;    /* 수평 중앙 정렬 */
      align-items: center;   
    }
  }

    button:hover {
     background-color: #AEDED3 /* 버튼 호버 색상 */
    }

  h4 {
    font-size: 1.2em;
    color: #6c757d;
    margin-bottom: 1em;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;

  @media (max-width: 768px) {
      gap: 0.5em;
      width: 100s%;
      font-size: 0.7em;
      justify-content: center;    /* 수평 중앙 정렬 */
      align-items: center;   
    }
    
  }

  label {
    font-size: 1.1em;
    color: #4b4b4b;
    margin-bottom: 0.5em;
  }

  input {
    padding: 0.8em;
    font-size: 1em;
    border: 1px solid #d1d1d1;
    border-radius: 15px;
    outline: none;
    transition: border-color 0.3s ease;
    
  }

  input:focus {
    border-color: #B4A2EB;
    box-shadow: 0 0 5px rgba(180, 162, 235, 0.5); 
  }



  p {
    color: red;
    text-align: center;
    font-size: 0.9em;
  }

  @media screen and (max-width: 38em) {
    width: 50%;
    // padding: 7vh 0 5vh 0;
    font-size: 1.0rem;
    // flex-direction: column;
  }
`;
