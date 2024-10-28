import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';

const WardCreate = ({ onWardCreated }) => {
  const [wardName, setWardName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');  // 에러 메시지 초기화

    try {
      const response = await axios.post(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/create/`, {
        name: wardName,
      });
      if (response.status === 201) {
        alert('병동이 성공적으로 생성되었습니다!');
        setWardName('');  // 폼 초기화
        onWardCreated();  // 병동 목록 갱신
      }
    } catch (error) {
      setError('병동 생성에 실패했습니다. 다시 시도해 주세요.');
      console.error('Error creating ward:', error);
    }
  };

  return (
    <AddWard>
      <h4>병동 추가</h4>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="wardName">병동 이름:</label> */}
        <input
          type="text"
          id="wardName"
          value={wardName}
          onChange={(e) => setWardName(e.target.value)}
          required
        />
        <button type="submit" className="add">병동 생성</button>
      </form>
      {error && <p>{error}</p>}
    </AddWard>
  );
};

export default WardCreate;

const AddWard = styled.div`
  background-color: #f4f6fc;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2em auto;
//   width: 100%;
//   max-width: 600px;

  h4 {
    font-size: 1.2em;
    color: #3a3a3a;
    margin-bottom: 1em;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
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
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color: #B4A2EB;
    box-shadow: 0 0 5px rgba(180, 162, 235, 0.5); 
  }

  button.add {
    background-color: #B4A2EB;
    color: white;
    padding: 1em;
    border: none;
    border-radius: 4px;
    font-size: 1.1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button.add:hover {
    background-color: #9e82d8;
  }

  button.add:active {
    background-color: #8a6fd0;
  }

  p {
    color: red;
    text-align: center;
    font-size: 0.9em;
  }

//   @media screen and (max-width: 38em) {
//     width: 70%;
//     // padding: 7vh 0 5vh 0;
//     font-size: 1.75rem;
//     // flex-direction: column;
//   }
`;
