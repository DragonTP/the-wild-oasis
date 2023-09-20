import styled from "styled-components";
import LoginForm from '../features/authentication/LoginForm';
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  @media screen and (max-width: 485px) {
    grid-template-columns: 40rem;
    margin-inline: auto;
    gap: 2.4rem;
  }

  @media screen and (max-width: 425px) {
    grid-template-columns: auto;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  )
}

export default Login;
