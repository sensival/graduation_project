import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">Wound gallery</Logo>
      <Menu>
        <NavItem to="/" exact>
          Home
        </NavItem>
        <NavItem to="/">병동선택</NavItem>
        <NavItem to="/">리스트보기</NavItem>
        <NavItem to="/">로그아웃</NavItem>
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
