import styled from "styled-components"
import Heading from '../../ui/Heading'
import { HiCheckCircle, HiFire } from 'react-icons/hi2';
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const HeadingThanks = styled(Heading)`
  color: var(--color-brand-500);
  & > svg {
    margin-right: 1rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 2.8rem;
  }

  @media screen and (max-width: 363px) {
    font-size: 2.4rem;

    & + p {
      font-size: 1.4rem;
    }
  }
`

const StyledThanksScreen = styled.div`
  flex: 1;
  padding: 3.2rem 2.4rem;
  display: grid;
  row-gap: 2rem;
  grid-template-columns: auto;
  justify-content: center;
  text-align: center;
  align-content: center;
`
const P = styled.p`
  text-transform: uppercase;
  color: var(--color-grey-500);
  font-size: 1.2rem;
  text-align: center;
  & > svg {
    margin-left: 1rem;
  }
`


function ThanksScreen() {
  const navigate = useNavigate();

  return (
    <StyledThanksScreen>
      <HeadingThanks>
        <HiCheckCircle />
        Thanks for submitting
      </HeadingThanks>
      <p>Your submission has been received!</p>
      <P>
        <span>Your opinion will help our brand improve further</span>
        <HiFire />
      </P>
      <Button style={{ maxWidth: '40rem' }} onClick={() => navigate('/')}>
        Check out our page &#10003;
      </Button>
    </StyledThanksScreen>
  )
}

export default ThanksScreen
