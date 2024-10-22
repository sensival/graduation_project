// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true });
            localStorage.removeItem('authToken'); // 저장된 토큰 제거
            navigate('/login'); // 로그인 페이지로 리디렉트
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;