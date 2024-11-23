import React from 'react';
import styled from 'styled-components';
import { memberList } from '../helpers/memberList';
import { AboutUs } from '../components/AboutUs';

const AboutUsPage = () => {
  const DemoImg1 = '실행화면1.jpg';
  const DemoImg2 = '실행화면2.jpg';
  const DemoImg3 = '실행화면3.jpg';

  return (
    <>
      <PageContainer className="about_us_box">
        <h2 id="about_subtitle">환자의 사진을 간편하게 관리하세요</h2>
        <BoxMeta>
        <BoxContainer className="about_us_box_main">
        <ImgMeta>
            <img src={ DemoImg1} alt='실행화면1' />
            <p>환자의 상처, 배액 양상, 정맥 주사 부위 상태 등등 사진으로 기록이 필요한 모든 곳에 활용해 보세요.</p>
            <img src={ DemoImg2} alt='실행화면2' />
            <p>병동 추가도 간편하게 실행할 수 있습니다.</p>
            <img src={ DemoImg3} alt='실행화면3' />
            <p>사진에 대한 메모도 추가하여 업로드할 수 있습니다.</p>
        </ImgMeta>
        <h2 id="about_subtitle">About Me</h2>
          {memberList.map((item) => (
            <AboutUs
              key={item.id}
              engName={item.engName}
              name={item.name}
              position={item.position}
              mbti={item.mbti}
              url1={item.url1}
              blog={item.blog}
              url2={item.url2}
              github={item.github}
              url3={item.url3}
              notion={item.notion}
              comment={item.comment}
            />
          ))}
          
        </BoxContainer><br />
        <BoxContainer2>
          
          
        </BoxContainer2>
        </BoxMeta>
      </PageContainer>
    </>
  );
};

export default AboutUsPage;

const BoxMeta = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
`;
const ImgMeta = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 0px;
    margin-right: 0px;
    margin: 0;
    padding: 0;
    
    
  img { 
    height: 32em;
    width: 50em;
    margin: 1rem 5rem 5rem 5rem;
  }
  
  p{
   margin-top: 0em;
   font-size: 1.5rem;
   margin-bottom: 7em;
   font-family: 'Gmarket_light';
  }
`;

const PageContainer = styled.div`
  display: flex;
  padding-top: 15vh;
  flex-direction: column;
  align-items: center;

  h1 {
    color: white;
    font-size: 3.5rem;
    margin-bottom: 1.25rem;
  }
  h2 {
    font-family: 'Elice_bold';
    margin-bottom: 1.25rem;
    font-size: 2rem;
  }
  #about_subtitle {
    margin-bottom: 2.5rem;
    color: rgba(0, 0, 0, 0.8);
  }

  @media only screen and (max-width: 48rem) {
    h1 {
      color: white;
      font-size: 2rem;
      margin-bottom: 0.625rem;
    }
    #about_subtitle {
      padding: 0 10px;
      font-size: 1rem;
      margin-bottom: 0.625rem;
      color: rgba(0, 0, 0, 0.8);
    }
  } ;
`;

const BoxContainer = styled.div`
  display: flex;
  margin-left: 0%;
  align-items: center;
  flex-direction: column;

`;


const BoxContainer2 = styled.div`
  display: flex;
  align-items: left;
`;
