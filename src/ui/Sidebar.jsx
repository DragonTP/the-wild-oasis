import { css, styled } from "styled-components";
import Logo from './Logo';
import MainNav from './MainNav';
import { HiXMark } from 'react-icons/hi2';

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  height: 100%;
  overflow: auto;
  background-color: var(--color-grey-0);
  transition: transform .2s, visibility .2s;

  @media screen and (max-width: 796px) {
    width: 24rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    ${({ open }) => css`
    visibility: ${open ? 'visible' : 'hidden'};
    transform: ${open ? 'translateX(0)' : 'translateX(-100%)'};
  `}
  }
`

const Overlay = styled.div`
  position: absolute;
  display: none;
  z-index: 998;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 796px) {
    display: block;
  }
`

const CloseButton = styled.button`
  border: none;
  position: absolute;
  display: none;
  top: 1.4rem;
  left: 1.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  background-color: transparent;
  font-size: 2.8rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  @media (max-width: 768px) {
    display: block;
  }
`
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <StyledSidebar open={isOpen}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        <Logo />
        <MainNav onClick={onClose} />
      </StyledSidebar>
      {isOpen && <Overlay onClick={onClose} />}
    </>
  )
}

export default Sidebar
