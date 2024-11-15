//TimeLine.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';

const TimeLine = ({ patientId }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (!patientId) return; // 환자가 선택되지 않았을 때는 요청하지 않음

        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/patients/${patientId}/photos`,{
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include'  // 자격 증명 포함
                  });
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [patientId]);

    return (
        <div>
            <h3>사진 타임라인</h3>
            <div>
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={photo.id}>
                            <img src={photo.url} alt="Patient Timeline" />
                            <p>{photo.timestamp}</p>
                            <p>{photo.memo}</p>
                        </div>
                    ))
                ) : (
                    <p>사진이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default TimeLine;
