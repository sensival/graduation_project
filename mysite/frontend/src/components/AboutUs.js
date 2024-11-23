import React from 'react';
import styled from 'styled-components';

export const AboutUs = ({ engName, name, position, mbti, url1, blog,url2, github, url3, notion, comment }) => {
  const frontImg = `ar이모지/${name}.png`;
  const backImg = `ar이모지/${name}표정.png`;


  const handleClick = (event) => {
    const elem = event.currentTarget;
    if (elem.style.transform === 'rotateY(180deg)') {
      elem.style.transform = 'rotateY(0deg)';
    } else {
      elem.style.transform = 'rotateY(180deg)';
    }
  };

  return (
    <Card className="card-inner" onClick={handleClick}>
      <Content className="front">
        <img src={frontImg} alt={`${name} 앞면 이미지`} />
        <h2>{engName}</h2>
        <h4>카드를 클릭해보세요</h4>
      </Content>
      <Content className="back">
        <div className="back_header">
          <img src={backImg} alt={`${name} 뒷면 이미지`} />
          <h2>
            {name} ({mbti})
          </h2>
          <h4>{position}</h4>
        </div>
        <div className="back_content">
        <h4>Link</h4>
          <a href={url1} target="blank">
            {blog}
          </a><br/>
          <a href={url2} target="blank">
            {github}
          </a><br/>
          <a href={url3} target="blank">
            {notion}
          </a><br/>
        </div>
      </Content>
    </Card>
  );
};

const Card = styled.div`
  margin: 1rem 5rem 5rem 1rem;
  width: 35%;
  height: 25em;
  transition: transform 1.2s;
  transform-style: preserve-3d;
  position: relative;
  .front {
    padding: 0.625rem 1.875rem;
    transform: rotateY(0deg);
    border-radius: 0.313rem;
    background-color: white;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
    font-family: 'Gmarket_Medium';
    h4 {
      font-size: 1em;
      color: rgba(0, 0, 0, 0.7);
      margin-top: 0.5em;
    }
    img {
      height: 15em;
      width: 15em;
    }
  }
  .back {
    padding: 0.625rem 1.875rem;
    transform: rotateY(180deg);
    background-color: #fff3cd ;
    border-radius: 0.313rem;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.4);
    display: flex;
    img {
      height: 10em;
      width: 10em;
    }
    .back_header {
      font-family: 'Gmarket_Medium';
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin: 5px;
      }
      h2 {
        margin: 0;
      }
      h4 {
        font-size: 1.0rem;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .back_content {
      width: 90%;
      margin-top: 0em;
      font-weight: normal;
      font-size: 1rem;
      font-family: 'Gmarket_Light';
      p {
        text-align: start;
        margin-top: 1em;
      }
      a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.7) ;
        font-size: 0.9em;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
      }
      h4 {
        background-color: none;
        color:  #B4A2EB;
        padding: 0.3em;
        border: 2px solid #B4A2EB;
        border-radius: 20px;
        font-size: 1em;
        margin-top: 0em;
        margin-bottom: 0.8em;
      }
    }
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  background-color: white;
`;
