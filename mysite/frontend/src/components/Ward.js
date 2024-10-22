import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WardCreate from './WardCreate';


const Ward = () => {
    const [wards, setWards] = useState([]); // 병동 목록 상태
    const [selectedWard, setSelectedWard] = useState(null); // 선택된 병동 상태
    const navigate = useNavigate();

    useEffect(() => {
        // 병동 목록을 가져오는 API 요청
        const fetchWards = async () => {
            try {
                const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/`); // 병동 API 호출
                setWards(response.data); // 병동 목록 상태 업데이트
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };

        fetchWards(); // 컴포넌트가 마운트될 때 병동 목록을 가져옴
    }, []);

    const handleWardSelect = (ward) => {
        setSelectedWard(ward); // 선택된 병동 업데이트
    };

    const handleContinue = () => {
        if (selectedWard) {
            // 선택된 병동이 있을 경우 다음 페이지로 이동
            navigate(`//${selectedWard.id}`); // 병동 상세 페이지로 리다이렉트
        } else {
            alert('Please select a ward to continue.'); // 병동 선택 알림
        }
    };

    const fetchWards = async () => {
        const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/`);
        setWards(response.data);
      };
    
      useEffect(() => {
        fetchWards();
      }, []);
    

    return (
        <div>
            <h2>Select a Ward</h2>
            <ul>
                {wards.map((ward) => (
                    <li key={ward.id}>
                        <button onClick={() => handleWardSelect(ward)}>
                            {ward.name}
                        </button>
                    </li>
                ))}
            </ul>
            <WardCreate onWardCreated={fetchWards} /> {/* 병동 생성 컴포넌트 추가 */}
            <button onClick={handleContinue}>Continue</button>
            {selectedWard && <p>You selected: {selectedWard.name}</p>}
        </div>
    );
};

export default Ward;
