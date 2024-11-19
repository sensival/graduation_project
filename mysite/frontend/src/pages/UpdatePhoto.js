import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { UploadContainer } from '../styles/UploadStyle';
import { UsernameContext } from '../components/UsernameContext';

const PhotoUpload = () => {
    const { username } = useContext(UsernameContext); // username 가져오기
    const { patientId } = useParams(); // URL에서 patientId를 가져오기
    const navigate = useNavigate(); // navigate 가져오기
    const [photo, setPhoto] = useState(null);
    const [memo, setMemo] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const wardId = queryParams.get('wardId');
    const photoId = queryParams.get('photoId'); // photoId 가져오기

    // 사진 정보 불러오기
    useEffect(() => {
        if (photoId) {
            const fetchPhoto = async () => {
                try {
                    const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos/${photoId}/update/`);
                    const { photo: photoUrl, memo: photoMemo } = response.data;
                    setPhoto(photoUrl);
                    console.log('원래url:', photoUrl);
                    setMemo(photoMemo);
                } catch (error) {
                    console.error('Error fetching photo:', error);
                    setErrorMessage('사진을 불러오는 데 실패했습니다.');
                }
            };

            fetchPhoto();
        }
    }, [photoId, patientId]);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleMemoChange = (e) => {
        setMemo(e.target.value);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!photo && !memo) {
            alert('사진을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        
        /// 새로 선택한 사진이 있을 경우만 추가
        if (photo) {
            formData.append('photo', photo);
            
        }
  
        formData.append('memo', memo);
        formData.append('uploaded_by', username);

        try {
            const response = await axios.patch(
                `${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos/${photoId}/update/`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log('Photo updated:', response.data);
            setUploadSuccess(true);
            setPhoto(null);
            setMemo('');
            navigate(`/list/${wardId}`); // 수정 후 환자 목록 페이지로 리디렉션
        } catch (error) {
            console.error('Error uploading photo:', error);
            setErrorMessage('사진 수정 중 오류가 발생했습니다.');
            setUploadSuccess(false);
        }
    };

    return (
        <UploadContainer>
            <h3>사진 수정</h3>
            {patientId ? (
                <>
                    <form onSubmit={handleUpload}>
                        {photo ? (
                            <div>
                                <img src={photo} alt="현재 사진" style={{ width: '20%', height: '20%' }} />
                                <p>현재 사진</p>
                            </div>
                        ) : (
                            <p>사진을 불러올 수 없습니다.</p>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        <textarea
                            placeholder="사진 메모 입력"
                            value={memo}
                            onChange={handleMemoChange}
                        ></textarea>
                        <button type="submit">수정된 사진 업로드</button>
                    </form>
                    {uploadSuccess && <p style={{ color: 'green' }}>사진이 성공적으로 수정되었습니다!</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </>
            ) : (
                <p>환자를 먼저 선택해주세요.</p>
            )}
        </UploadContainer>
    );
};

export default PhotoUpload;
