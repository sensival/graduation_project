import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { UploadContainer } from '../styles/UploadStyle';

const PhotoUpload = ({ selectedPatient }) => {
    const [photo, setPhoto] = useState(null); // 업로드할 사진 파일
    const [memo, setMemo] = useState(''); // 사진 메모
    const [uploadSuccess, setUploadSuccess] = useState(false); // 업로드 성공 여부
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지

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

        try {
            const response = await axios.post(
                `${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${selectedPatient.id}/photos/add/`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Photo uploaded:', response.data);
            setUploadSuccess(true);
            setPhoto(null);
            setMemo('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error uploading photo:', error);
            setErrorMessage('사진 업로드 중 오류가 발생했습니다.');
            setUploadSuccess(false);
        }
    };

    return (
        <UploadContainer>
            <h3>사진 업로드</h3>
            {selectedPatient ? (
                <>
                    <p>선택된 환자: {selectedPatient.name}</p>
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
