import React, { useState } from 'react';
import axios from 'axios';

const WardCreate = ({ onWardCreated }) => {
  const [wardName, setWardName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');  // 에러 메시지 초기화

    try {
      const response = await axios.post('http://localhost:8000/gallery/api/wards/create/', {
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
    <div>
      <h3>병동 추가</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="wardName">병동 이름:</label>
        <input
          type="text"
          id="wardName"
          value={wardName}
          onChange={(e) => setWardName(e.target.value)}
          required
        />
        <button type="submit">병동 생성</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default WardCreate;
