import styled from 'styled-components';

// 전체 컨테이너 스타일
export const TimelineContainer = styled.div`
  padding: 20px;
  width: 100%; /* 고정된 너비 */
  height: auto; /* 화면 전체 높이 */
  background-color: white;
  overflow-y: auto; /* 세로 스크롤 */
  overflow-x: auto; /* 가로 스크롤 */
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10em;
`;

// 헤더 스타일
export const Header = styled.h3`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 1em;
  text-align: center;
`;

// 사진 리스트 컨테이너 스타일
export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 반응형 그리드 */
  gap: 3em;
  width: 100%; /* 리스트 전체 너비 */
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// 개별 사진 카드 스타일
export const PhotoCard = styled.div`
  width:70%; /* 고정된 너비 */
  height: auto; /* 비율에 따라 높이 자동 조정 */
  background-color: white;
  border: 1px solid #AEDED3;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: left;
  overflow: hidden; /* 필요 시 콘텐츠 잘림 방지 */
`;

// 이미지 스타일
export const PhotoImage = styled.img`
  width: 80%;
  padding: 0.2em 0.2em 0.5em 10%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

// 텍스트 스타일
export const PhotoText = styled.p`
  font-size: 1.0em;
  color: #555;
  margin: 0.1em 0.1em;
  display: flex;

   /* 시간 스타일 */
    &.upload-time {
        font-weight: normal;
        color: #6c757d;
        font-size: 1.1em;
        padding: 0.2em 0.2em 0.2em 0.3em;
    }

    /* 메모 스타일 */
    &.memo {
        color: #333;
        margin-left: 2em;
        margin-bottom: 1.5em;
        margin-top: 0.5em;
    }

    /* 게시자 스타일 */
    &.uploaded-by {
        border: 1px solid #ccc; /* 경계선 설정 */
        border-radius: 20px;
        background-color: #B2ACFA;
        padding: 0em 0.8em 0.2em 0.8em; /* 내부 여백 */
        font-weight: bold;
        font-size: 1.2em;
        color: white;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const PhotoMeta = styled.div`
    display: flex;
    align-items: left;
    margin-bottom: 10px;
`;

export const ButtonMeta = styled.div`
    display: flex;
    align-items: right;
    margin-bottom: 2%;
    margin-left: 80%;
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &.update {
    background-color: #B4A2EB;
    color: white;
    padding: 0.2em 1em 0.4em 1em;
    border: none;
    border-radius: 10px;
    font-size: 0.9em;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    }

   &.update:hover {
    background-color: #AEDED3 /* 버튼 호버 색상 */
    }

   &.update.active {
    background-color: #AEDED3; /* 버튼 클릭 시 색상 */
    }
  } 

  &.delete {
    background-color: #ff623c;
    color: white;
    margin-left: 0.5em;
    font-weight: bold;
    padding:0.2em 1em 0.4em 1em;
    border: none;
    border-radius: 10px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    }

  &.delete:hover {
    background-color: #FFE4BA; /* 버튼 호버 색상 */
    }

  &.delete.active {
    background-color: #FFE4BA; /* 버튼 클릭 시 색상 */
    }
  } 
`;