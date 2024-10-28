import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { REACT_APP_HOST_IP_ADDRESS } from '../env';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${ REACT_APP_HOST_IP_ADDRESS }gallery/api/logout/`);
      localStorage.removeItem('authToken'); // 로컬 저장소에서 토큰 삭제
      sessionStorage.clear(); // 세션 스토리지 초기화
      navigate('/login'); // /login 페이지로 리디렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Nav>
      <Logo to="/">Kardex with pictures</Logo>
      <Menu>
        <NavItem to="/" exact>Home</NavItem>
        <NavItem to="/select-ward">병동선택</NavItem>
        <NavItem to="/list">리스트보기</NavItem>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton> {/* 버튼으로 설정 */}
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background-color: #B4A2EB;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서는 수직으로 배치 */
    padding: 0.5em;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5em;
  color: white;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 1.2em; /* 모바일에서 폰트 크기 조정 */
    margin-bottom: 0.5em;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 1em;

  @media (max-width: 768px) {
    gap: 0.5em;
    align-items: center;
    width: 100%;
  }
`;

const NavItem = styled(NavLink)`
  color: white;
  justify-content: space-between;
  text-decoration: none;
  font-size: 1.1em;

  &:hover {
    color: #AEDED3;
  }
  
  &.active {
    font-weight: bold;
    color: #AEDED3;
  }

  @media (max-width: 768px) {
    justify-content: space-around; 
    align-items: center;
    font-size: 1em; /* 모바일에서 폰트 크기 조정 */
    width: 25%;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1em;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #AEDED3;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 1em; /* 모바일에서 폰트 크기 조정 */
  }
`;

export { Nav, Logo, Menu, NavItem, LogoutButton };