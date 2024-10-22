import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/gallery/api/logout/');
      localStorage.removeItem('authToken'); // 로컬 저장소에서 토큰 삭제
      sessionStorage.clear(); // 세션 스토리지 초기화
      navigate('/login'); // /login 페이지로 리디렉트
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Nav>
      <Logo to="/">Wound gallery</Logo>
      <Menu>
        <NavItem to="/" exact>Home</NavItem>
        <NavItem to="/select-ward">병동선택</NavItem>
        <NavItem to="/list">리스트보기</NavItem>
        <NavItem as="button" onClick={handleLogout}>로그아웃</NavItem> {/* 버튼으로 설정 */}
      </Menu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background-color: #333;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5em;
  color: white;
  text-decoration: none;
`;

const Menu = styled.div`
  display: flex;
  gap: 1em;
`;

const NavItem = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.1em;

  &.active {
    font-weight: bold;
    color: #ff6347;
  }
`;
