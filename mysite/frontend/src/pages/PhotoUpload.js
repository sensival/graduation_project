import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams 추가
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { UploadContainer } from '../styles/UploadStyle';
import { UsernameContext } from '../components/UsernameContext';

const PhotoUpload = () => {
    const { username } = useContext(UsernameContext); // username 가져오기
    console.error('username', username )
    const { patientId } = useParams(); // URL에서 patientId를 가져오기
    const [photo, setPhoto] = useState(null);
    const [memo, setMemo] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleFileChange = (e) => {
      setPhoto(e.target.files[0]);
    };
  
    const handleMemoChange = (e) => {
      setMemo(e.target.value);
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
      if (!photo) {
        alert('사진을 선택해주세요.');
        return;
      }
  
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('memo', memo);
      formData.append('uploaded_by', username); // username 추가
  
      try {
        const response = await axios.post(
          `${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos/add/`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log('Photo uploaded:', response.data);
        setUploadSuccess(true);
        setPhoto(null);
        setMemo('');
      } catch (error) {
        console.error('Error uploading photo:', error);
        setErrorMessage('사진 업로드 중 오류가 발생했습니다.');
        setUploadSuccess(false);
      }
    };
  
    return (
      <UploadContainer>
        <h3>사진 업로드</h3>
        {patientId ? (
          <>
            <form onSubmit={handleUpload}>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <textarea
                placeholder="사진 메모 입력"
                value={memo}
                onChange={handleMemoChange}
              ></textarea>
              <button type="submit">사진 업로드</button>
            </form>
            {uploadSuccess && <p style={{ color: 'green' }}>사진이 성공적으로 업로드되었습니다!</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </>
        ) : (
          <p>환자를 먼저 선택해주세요.</p>
        )}
      </UploadContainer>
    );
  };
  
  export default PhotoUpload;
  
