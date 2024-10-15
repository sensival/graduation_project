
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 상태
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.'); // 비밀번호 불일치 오류 메시지
            return;
        }
        
        try {
            const response = await axios.post(`${ REACT_APP_HOST_IP_ADDRESS }gallery/api/signup/`, {
                username,
                email,
                password,
            });
            if (response.status === 201) {
                alert('회원가입이 성공적으로 완료되었습니다!');
                navigate('/login'); // 회원가입 후 로그인 페이지로 리디렉션
            }
        } catch (error) {
            setError(error.response ? error.response.data.detail : '회원가입 실패');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSignUp}>
                <label>사용자 이름:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>이메일:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>비밀번호:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>비밀번호 확인:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">회원가입</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;