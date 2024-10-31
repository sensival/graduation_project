// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { REACT_APP_HOST_IP_ADDRESS } from '../env';
// import { ListContainer } from '../styles/ListStyle';


// const PatientList = ({ wardId, onSelectPatient }) => {
//     const [patients, setPatients] = useState([]);

//     useEffect(() => {
//         if (!wardId) {
//             console.error('Ward ID is not provided');
//             return;
//         }

//         const fetchPatients = async () => {
//             console.log('Ward ID:', wardId);  // wardId가 제대로 전달되는지 확인
//             try {
//                 const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/${wardId}/patients/`);
//                 console.log('Fetched patients:', response.data);
//                 setPatients(response.data);
//             } catch (error) {
//                 console.error('Error fetching patients:', error);
//             }
//         };

//         fetchPatients();
//     }, [wardId]);  // wardId가 변경될 때마다 다시 실행

//     return (
//         <div>
//             <ListContainer>
//             <h3>환자 목록</h3>
//             <ul>
//                 {patients.map((patient) => (
//                     <li key={patient.id}>
//                         <button onClick={() => onSelectPatient(patient)}>
//                             {patient.name}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             </ListContainer>
//         </div>
//     );
// };

// export default PatientList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import { ListContainer, AddPatient } from '../styles/ListStyle';

const PatientList = ({ wardId, onSelectPatient }) => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newPatientName, setNewPatientName] = useState('');
    const [isAddingPatient, setIsAddingPatient] = useState(false);  // 추가 폼 표시 여부 상태

    useEffect(() => {
        if (!wardId) {
            console.error('Ward ID is not provided');
            return;
        }

        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/${wardId}/patients/`);
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, [wardId]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddPatient = async (e) => {
        e.preventDefault();
        if (!newPatientName.trim()) {
            alert('환자 이름을 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/wards/${wardId}/patients/`, {
                name: newPatientName,
            });
            setPatients([...patients, response.data]);
            setNewPatientName('');
            setIsAddingPatient(false);  // 폼 닫기
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    const toggleAddPatientForm = () => {
        setIsAddingPatient(!isAddingPatient);  // 폼 표시 여부 토글
    };

    return (
        <div>
            <ListContainer>
                {/* Toggle Add Patient Form */}
                <button class ="add" onClick={toggleAddPatientForm}>
                {isAddingPatient ? '취소' : '+ Add Patient'}
                </button>

                {/* Add Patient Form */}
                {isAddingPatient && (
                    <AddPatient>
                    <form onSubmit={handleAddPatient}>
                        <input
                            type="text"
                            placeholder="새 환자 이름"
                            value={newPatientName}
                            onChange={(e) => setNewPatientName(e.target.value)}
                        />
                        <button type="submit">추가</button>
                    </form>
                    </AddPatient>
                )}
                <div class="blank"></div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="환자 이름 검색"
                    value={searchTerm}
                    onChange={handleSearch}
                />

                {/* Patient List */}
                <ul>
                    {filteredPatients.map((patient) => (
                        <li key={patient.id}>
                            <button onClick={() => onSelectPatient(patient)}>
                                {patient.name}
                            </button>
                        </li>
                    ))}
                </ul>


            </ListContainer>
        </div>
    );
};

export default PatientList;
