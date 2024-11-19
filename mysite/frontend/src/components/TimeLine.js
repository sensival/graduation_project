import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { TimelineContainer, PhotoList, PhotoCard, PhotoImage, PhotoText, PhotoMeta, ButtonMeta, Button } from '../styles/TimeLineStyle';
import { useNavigate, useParams } from 'react-router-dom';

const formatDateToKoreanTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 24시간 형식
    };

    const koreanTime = date.toLocaleString('ko-KR', options).replace(',', '');
    
    return koreanTime;
};

const TimeLine = ({ patientId }) => {
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();
    const { wardId } = useParams();

    useEffect(() => {
        if (!patientId) return;

        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos`, {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const sortedPhotos = response.data.sort((a, b) => new Date(b.upload_time) - new Date(a.upload_time));
                setPhotos(sortedPhotos);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [patientId]);

    // 사진 삭제 함수
    const deletePhoto = async (photoId) => {
        const confirmed = window.confirm('정말로 이 사진을 삭제하시겠습니까?');
        if (!confirmed) return;
    
        try {
            await axios.delete(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos/${photoId}/update/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            // 삭제된 사진을 목록에서 제거
            setPhotos(photos.filter(photo => photo.id !== photoId));
            
            // 삭제 후 리디렉트
            navigate(`/list/${wardId}`);
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('사진 삭제 중 문제가 발생했습니다.');
        }
    };

    // 수정 버튼 클릭 시 PhotoUpload 페이지로 이동
    const editPhoto = (photoId) => {
        navigate(`/patients/${patientId}/update?photoId=${photoId}&wardId=${wardId}`);
    };

    return (
        <TimelineContainer>
            <PhotoList>
                {photos && photos.length > 0 ? (
                    photos.map((photo) => (
                        <PhotoCard key={photo.id}>
                            <PhotoImage src={photo.photo} alt="Patient Timeline" />
                            <PhotoMeta>
                                <PhotoText className="uploaded-by">{photo.uploaded_by}</PhotoText>
                                <PhotoText className="upload-time">{formatDateToKoreanTime(photo.upload_time)}</PhotoText>
                            </PhotoMeta>
                            <PhotoText className="memo">{photo.memo}</PhotoText>
                            <ButtonMeta>
                                <Button className="update" onClick={() => editPhoto(photo.id)}>수정</Button>
                                <Button className="delete" onClick={() => deletePhoto(photo.id)}>삭제</Button>
                            </ButtonMeta>
                        </PhotoCard>
                    ))
                ) : (
                    <PhotoText>사진이 없습니다.</PhotoText>
                )}
            </PhotoList>
        </TimelineContainer>
    );
    
};

export default TimeLine;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { REACT_APP_HOST_IP_ADDRESS } from '../env';
// import { TimelineContainer, PhotoList, PhotoCard, PhotoImage, PhotoText, PhotoMeta } from '../styles/TimeLineStyle';

// const formatDateToKoreanTime = (dateString) => {
//     const date = new Date(dateString);

//     const options = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         hour12: false, // 24시간 형식
//     };

//     const koreanTime = date.toLocaleString('ko-KR', options).replace(',', '');
    
//     return koreanTime;
// };

// const TimeLine = ({ patientId }) => {
//     const [photos, setPhotos] = useState([]);

//     useEffect(() => {
//         if (!patientId) return;

//         const fetchPhotos = async () => {
//             try {
//                 const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos`, {
//                     method: 'GET',
//                     headers: {
//                       'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                 });

//                 const sortedPhotos = response.data.sort((a, b) => new Date(b.upload_time) - new Date(a.upload_time));
//                 setPhotos(sortedPhotos);
//             } catch (error) {
//                 console.error('Error fetching photos:', error);
//             }
//         };

//         fetchPhotos();
//     }, [patientId]);

//     return (
//         <TimelineContainer>
//           <PhotoList>
//             {photos.length > 0 ? (
//               photos.map((photo) => (
//                 <PhotoCard key={photo.id}>
//                   {/* 사진 */}
//                    <PhotoImage src={photo.photo} alt="Patient Timeline" />
//                    {/* 게시자와 날짜를 한 줄에 표시 */}
//                    <PhotoMeta>
//                     <PhotoText className="uploaded-by">{photo.uploaded_by}</PhotoText>
//                     <PhotoText className="upload-time">{formatDateToKoreanTime(photo.upload_time)}</PhotoText>
//                   </PhotoMeta>
//                   {/* 메모 */}
//                   <PhotoText className="memo">{photo.memo}</PhotoText>
//                 </PhotoCard>
//               ))
//             ) : (
//               <PhotoText>사진이 없습니다.</PhotoText>
//             )}
//           </PhotoList>
//         </TimelineContainer>
//     );
// };

// export default TimeLine;
