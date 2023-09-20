import { useCallback, useState } from "react";
import styled from "styled-components"
import Logo from "../ui/Logo"
import FormFeedback from '../features/feedback/FormFeedback';
import ThanksScreen from "../features/feedback/ThanksScreen";

const FeedbackLayout = styled.main`
  background-color: var(--color-grey-50);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 80%;
  max-width: 80rem;
  height: 90vh;
  border: 2px solid var(--color-grey-500);
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2.4rem;
  gap: 2.4rem;
  border-radius: var(--border-radius-lg);
`

function Feedback() {
  const [isDone, setIsDone] = useState(false);
  const doneForm = useCallback(() => setIsDone(true), []);

  return (
    <FeedbackLayout>
      <Container> 
        <Logo />
        {isDone ? <ThanksScreen /> : <FormFeedback doneForm={doneForm} />}
      </Container>
    </FeedbackLayout>
  )
}

export default Feedback
