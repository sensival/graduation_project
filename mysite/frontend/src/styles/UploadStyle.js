import styled from 'styled-components';

export const UploadContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 70%;
    justify-content: center;    /* 수평 중앙 정렬 */
    align-items: center; 
    margin: 5em auto;      
    h3 {
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 10px;
    }

    
    textarea {
        width: 95%;
        max-height: 300px;  /* 최대 높이 설정 */
        overflow-y: auto;   /* 세로 스크롤 */
        margin: 2em auto;   
        padding: 12px 16px; /* 여백을 더 크게 설정하여 편안한 입력 공간 */
        border: 2px solid #B4A2EB; /* 보더 색상 */
        border-radius: 12px; /* 둥근 모서리 */
        font-size: 1em;      /* 글자 크기 설정 */
        font-family: 'Noto Sans KR', sans-serif; /* 한글에 어울리는 예쁜 폰트 */
        background-color: #f9f9f9;  /* 배경색 밝게 */
        color: #333;  /* 텍스트 색상 */
        transition: all 0.3s ease; /* 상태 변화에 부드러운 효과 추가 */
        }

    textarea:focus {
        border-color: #AEDED3; /* 포커스 시 보더 색상 */
        background-color: #fff; /* 포커스 시 배경을 흰색으로 */
        outline: none; /* 기본 outline 제거 */
        box-shadow: 0 0 8px rgba(174, 222, 211, 0.5); /* 포커스 시 그림자 추가 */
    }

    textarea::placeholder {
        color: #aaa; /* 플레이스홀더 색상 */
        font-style: italic; /* 이탤릭체로 표시 */
    }
    button{
        background-color: #B4A2EB;
        color: white;
        padding: 1em;
        font-weight: bold;
        border: none;
        border-radius: 20px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

    button:hover {
        background-color: #AEDED3 /* 버튼 호버 색상 */
        }

    button.active {
        background-color: #AEDED3; /* 버튼 클릭 시 색상 */
    }
    
    input{
        background-color:#fff;
        color:  #6c757d;
        border-radius: 20px;
        border: 0.5px solid  #ccc;
        margin: 2em 0.75rem;
        width: 50%;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    ::file-selector-button {
    font-weight: bold;
    color: white;
    font-size: 1.1em;
    background-color:  #B4A2EB;
    border: none ;
    border-radius: 1px;
    padding:10px 20px 10px 20px;
    transition: background-color 0.3s ease;

    }
    ::file-selector-button:hover{
    background-color: #AEDED3 /* 버튼 호버 색상 */
    }

`;
