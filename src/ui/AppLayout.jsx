import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { styled } from "styled-components"
import { useState } from "react"

const StyledAppLayout = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
  @media screen and (max-width: 796px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (min-width: 797px) and (max-width: 1000px) {
    grid-template-columns: 20rem 1fr;
  }
`
const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow: auto;
  flex: 1;

  @media screen and (max-width: 1000px) {
    padding-left: 3.2rem;
    padding-right: 3.2rem;
  }

  @media screen and (max-width: 590px) {
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
`

const Container = styled.div`
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 auto;
`

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header onOpen={() => setIsOpen(true)} />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
