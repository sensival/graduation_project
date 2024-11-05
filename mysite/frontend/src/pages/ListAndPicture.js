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
`;

const Content = styled.div`
    width: 70%;
    padding: 20px;
`;

const UploadButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
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
            navigate(`/patients/${selectedPatient.id}/upload`);
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