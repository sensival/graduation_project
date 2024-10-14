import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/Signup';
import Ward from './components/Ward';

function App() {
  return (
    <div className="App">
      <Router>
        <Content />
      </Router>
    </div>
  );
}

function Content() {
  const location = useLocation();
  
  // 현재 경로가 '/login' 또는 '/signup'인지 확인
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {/* 인증 페이지가 아닐 때만 네비게이션 바 표시 */}
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-ward" element={<Ward />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
