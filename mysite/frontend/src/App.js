// App.js
import './App.css'; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SelectWard from './components/Ward';
import ExternalRedirect from './components/ExternalRedirect';
import PatientList from './components/PatientList';
import ListAndPicture from './pages/ListAndPicture';
import PhotoUpload from './pages/PhotoUpload';
import UpdatePhoto from './pages/UpdatePhoto'; 
import { UsernameProvider } from './components/UsernameContext';

const AppContainer = styled.div`
  background-color: white ;/* 배경색을 흰색으로 고정 */
  color: #6c757d; /* 텍스트 색상 */
  min-height: 100vh; /* 전체 높이를 채워 화면이 비지 않도록 설정 */
  font-family: 'Noto Sans KR', sans-serif;

  
`;

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 예시: sessionStorage 또는 다른 저장소에서 username 가져오기
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <AppContainer>
      <UsernameProvider>
      <Router>
      <div className="App">
        <Navbar username={username}  />
        <Routes>
          <Route path="/" element={<ExternalRedirect url="http://192.168.0.5:8000/gallery/login/" />}/>
          <Route path="/select-ward" element={<SelectWard />} />
          {/* 환자 목록 페이지 */}
          <Route path="/list/:wardId" element={<ListAndPicture />} />
          <Route path="/patients/:patientId/upload" element={<PhotoUpload  username={username} />} />
          <Route path="/patients/:patientId/update" element={<UpdatePhoto username={username} />} /> {/* UpdatePhoto 페이지로 수정 */}
          {/* Django 서버의 로그인/회원가입 페이지로 리디렉트 */}
          <Route path="/login" element={<ExternalRedirect url="http://192.168.0.5:8000/gallery/login/" />} />
          <Route path="/signup" element={<ExternalRedirect url="http://192.168.0.5:8000/gallery/signup/" />} />

        </Routes>
      </div>
    </Router>
    </UsernameProvider>
    </AppContainer>
  );
}

//<Route path="/login" element={<Login />} />
//<Route path="/signup" element={<SignUp />} />
export default App;
