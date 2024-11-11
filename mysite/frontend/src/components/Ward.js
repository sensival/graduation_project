// import { REACT_APP_HOST_IP_ADDRESS } from '../env';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import WardCreate from './WardCreate';
// import { WardContainer,AddWard } from '../styles/WardStyle';


// const Ward = () => {
//     const [wards, setWards] = useState([]); // 병동 목록 상태
//     const [selectedWard, setSelectedWard] = useState(null); // 선택된 병동 상태
//     const navigate = useNavigate();
//     const [showWardCreate, setShowWardCreate] = useState(false); // 토글 상태 추가

//     // 토글 버튼 클릭 시 상태 변경
//     const toggleWardCreate = () => {
//       setShowWardCreate(!showWardCreate);
//     };
  

//     const handleWardSelect = (ward) => {
//         setSelectedWard(ward); // 선택된 병동 업데이트
//     };

//     const handleContinue = () => {
//         if (selectedWard) {
//             // 선택된 병동이 있을 경우 다음 페이지로 이동
//             navigate(`//${selectedWard.id}`); // 병동 상세 페이지로 리다이렉트
//         } else {
//             alert('Please select a ward to continue.'); // 병동 선택 알림
//         }
//     };

//     const fetchWards = async () => {
//         const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/`);
//         setWards(response.data);
//         const sortedWards = response.data.sort((a, b) => a.name.localeCompare(b.name));
//         setWards(sortedWards);
//       };
    
//       useEffect(() => {
//         fetchWards();
//       }, []);

//     return (
//         <WardContainer>
//         <div>
//             <h3>나의 병동 선택</h3>
//             <div class="form_size">
//             <ul>
//                 {wards.map((ward) => (
//                     <li key={ward.id}>
//                         <button class="list" onClick={() => handleWardSelect(ward)}>
//                             {ward.name}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             </div>
//             <button class="create" onClick={handleContinue}>Continue</button>
//             <div class="blank">

//             </div>
//             <div>
//             <button class ="add" onClick={toggleWardCreate}>
//                 {showWardCreate ? '새로운 병동 추가 하기' : '새로운 병동 추가 하기'}
//             </button>
//             {showWardCreate && (
//                 <WardCreate onWardCreated={fetchWards} /> // 병동 생성 컴포넌트 조건부 렌더링
//             )}
//             </div>   
//         </div>
//         </WardContainer>
//     );
// };

// export default Ward;

import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import WardCreate from './WardCreate';
import { WardContainer } from '../styles/WardStyle';

const Ward = () => {
    const [wards, setWards] = useState([]);
    const [showWardCreate, setShowWardCreate] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState(null);  // username 상태 관리

    // 쿼리 파라미터에서 username을 추출
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const user = queryParams.get('username');
        if (user) {
            setUsername(user);  // username 상태 설정
        }
    }, [location]);

    const fetchWards = async () => {
        try {
            const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/`);
            const sortedWards = response.data.sort((a, b) => a.name.localeCompare(b.name));
            setWards(sortedWards);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    useEffect(() => {
        fetchWards();
    }, []);

    const handleWardClick = (ward) => {
        if (ward && ward.id) {
            navigate(`/list/${ward.id}`); // ward.id가 있는 경우에만 요청
        } else {
            console.error('Invalid ward data:', ward);
        }// ward.id를 함께 전달
    };

    const toggleWardCreate = () => {
        setShowWardCreate(!showWardCreate);
    };

    return (
        <WardContainer>
            <h3>나의 병동 선택</h3>
            <div className="form_size">
                <ul>
                    {wards.map((ward) => (
                        <li key={ward.id}>
                            <button className="list" onClick={() => handleWardClick(ward)}>
                                {ward.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="add" onClick={toggleWardCreate}>
                {showWardCreate ? '취소' : '새로운 병동 추가 하기'}
            </button>
            {showWardCreate && (
                <WardCreate onWardCreated={fetchWards} />
            )}
        </WardContainer>
    );
};

export default Ward;
