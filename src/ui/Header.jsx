import { styled } from "styled-components"
import { HiBars3 } from "react-icons/hi2"
import UserAvatar from '../features/authentication/UserAvatar'
import HeaderMenu from "./HeaderMenu"

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: end;

  @media screen and (max-width: 796px) {
    justify-content: space-between;
  }
`

const HiBar = styled(HiBars3)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: none;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 796px) {
    display: block;
  }
`

const UserContainer = styled.div`
  display: flex;
  gap: 2.4rem;

  @media screen and (max-width: 500px) {
    gap: 1.6rem;
  }
`

function Header({ onOpen }) {
  return (
    <StyledHeader>
      <HiBar onClick={onOpen} />
      <UserContainer>
        <UserAvatar />
        <HeaderMenu />
      </UserContainer>
    </StyledHeader>
  )
}

export default Header
