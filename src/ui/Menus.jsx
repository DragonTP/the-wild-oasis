import { createContext, useCallback, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  ${({ $position }) => css`
    right: ${$position.x}px;
    top: ${$position.y}px;
  `}
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState({});
  const close = useCallback(() => setOpenId(''), [])
  const ref = useClickOutside(close);
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, open, close, ref, setPosition, position }}>
      {children}
    </MenusContext.Provider>
  )
}

function Toggle({ id }) {
  const { open, setPosition, openId, close } = useContext(MenusContext);
  const handleClick = e => {
    if (id === openId) return close();

    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.right,
      y: rect.bottom + 8
    })
    open(id);
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  )
}

function List({ children, id }) {
  const { openId, ref, position } = useContext(MenusContext);

  return openId === id && createPortal(<StyledList $position={position} ref={ref}>{children}</StyledList>, document.body)
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>{icon} <span>{children}</span></StyledButton>
    </li>
  )
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;


export default Menus

