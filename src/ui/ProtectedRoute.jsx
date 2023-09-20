import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(----color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2. If there is NO authenticated, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated & !isLoading) navigate('/login');
  }, [navigate, isAuthenticated, isLoading])

  // 3. While loading, show spinner
  if (isLoading) return <FullPage>
    <Spinner />
  </FullPage>

  // 4. If there IS a user, render the app 
  if (isAuthenticated) return children;
}

export default ProtectedRoute
