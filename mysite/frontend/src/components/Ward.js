import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WardCreate from './WardCreate';
import { WardContainer,AddWard } from '../styles/WardStyle';


const Ward = () => {
    const [wards, setWards] = useState([]); // 병동 목록 상태
    const [selectedWard, setSelectedWard] = useState(null); // 선택된 병동 상태
    const navigate = useNavigate();
    const [showWardCreate, setShowWardCreate] = useState(false); // 토글 상태 추가

    // 토글 버튼 클릭 시 상태 변경
    const toggleWardCreate = () => {
      setShowWardCreate(!showWardCreate);
    };
  

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
        const sortedWards = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setWards(sortedWards);
      };
    
      useEffect(() => {
        fetchWards();
      }, []);

    return (
        <WardContainer>
        <div>
            <h3>나의 병동 선택</h3>
            <div class="form_size">
            <ul>
                {wards.map((ward) => (
                    <li key={ward.id}>
                        <button class="list" onClick={() => handleWardSelect(ward)}>
                            {ward.name}
                        </button>
                    </li>
                ))}
            </ul>
            </div>
            <button class="create" onClick={handleContinue}>Continue</button>
            <div class="blank">

            </div>
            <div>
            <button class ="add" onClick={toggleWardCreate}>
                {showWardCreate ? '새로운 병동 추가 하기' : '새로운 병동 추가 하기'}
            </button>
            {showWardCreate && (
                <WardCreate onWardCreated={fetchWards} /> // 병동 생성 컴포넌트 조건부 렌더링
            )}
            </div>   
        </div>
        </WardContainer>
    );
};

export default Ward;
