//ListAndPictures.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 추가
import PatientList from '../components/PatientList';
import TimeLine from '../components/TimeLine';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 20%;
    padding: 20px;
    background-color: #f7f7f7;
    border-right: 1px solid #ddd;
    position: fixed; /* 스크롤해도 고정되도록 설정 */
    margin-top : 4em ;
    height: 100vh; 
    overflow-y: auto; /* 내용이 많으면 스크롤 가능하게 설정 */

    @media (max-width: 768px) {
    width: 35%;
    padding: 0.5em; 0.8em;
    font-size: 0.9em;
    margin-top : 5em ;
  }
`;

const Content = styled.div`
    width: 70%;
    padding: 50px;
    position: fixed; /* 스크롤해도 고정되도록 설정 */
    margin-top : 2% ;
    height: 100vh; 
    overflow-y: auto;
    margin-left: 20%;

    @media (max-width: 768px) {
    margin-left: 10em;
    width: 65%;
    font-size: 0.7em;
    align-items: center;  
  }
`;

const UploadButton = styled.button`
    position: fixed; /* 화면에서 고정 위치 설정 */
    bottom: 20px; /* 화면 하단으로부터 20px */
    right: 20px; /* 화면 오른쪽으로부터 20px */
    padding: 10px 20px;
    background-color: #B4A2EB;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 999;

    &:hover {
        background-color: #AEDED3;
    }
`;

const ListAndPicture = () => {
    const { wardId } = useParams(); // URL에서 wardId 가져오기
    const [selectedPatient, setSelectedPatient] = useState(null);
    const navigate = useNavigate(); // navigate 함수 가져오기

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const goToPhotoUpload = () => {
        if (selectedPatient) {
            navigate(`/patients/${selectedPatient.id}/upload?wardId=${wardId}`);
        } else {
            alert('환자를 먼저 선택해주세요!');
        }
    };

    return (
        <Container>
            <Sidebar>
                <PatientList wardId={wardId} onSelectPatient={handleSelectPatient} />
            </Sidebar>
            <Content>
                {selectedPatient ? (
                    <>
                        <TimeLine patientId={selectedPatient.id} />
                        <UploadButton onClick={goToPhotoUpload}>
                            사진 업로드
                        </UploadButton>
                    </>
                ) : (
                    <p>환자를 선택하여 사진 타임라인을 확인하세요.</p>
                )}
            </Content>
        </Container>
    );
};

export default ListAndPicture;

// '''
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // useParams 추가
// import PatientList from '../components/PatientList';
// import TimeLine from '../components/TimeLine';
// import styled from 'styled-components';

// const Container = styled.div`
//     display: flex;
//     height: 100vh;
// `;

// const Sidebar = styled.div`
//     width: 20%;
//     padding: 20px;
//     background-color: #f7f7f7;
//     border-right: 1px solid #ddd;
// `;

// const Content = styled.div`
//     width: 70%;
//     padding: 20px;
// `;

// const ListAndPicture = () => {
//     const { wardId } = useParams(); // URL에서 wardId 가져오기
//     const [selectedPatient, setSelectedPatient] = useState(null);

//     const handleSelectPatient = (patient) => {
//         setSelectedPatient(patient);
//     };

//     return (
//         <Container>
//             <Sidebar>
//                 <PatientList wardId={wardId} onSelectPatient={handleSelectPatient} />
//             </Sidebar>
//             <Content>
//                 {selectedPatient ? (
//                     <TimeLine patientId={selectedPatient.id} />
//                 ) : (
//                     <p>환자를 선택하여 사진 타임라인을 확인하세요.</p>
//                 )}
//             </Content>
//         </Container>
//     );
// };

// export default ListAndPicture;
// '''