import styled from "styled-components";
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import { Link } from "react-router-dom";

const NumNights = styled.div`
  @media screen and (max-width: 540px) {
    font-weight: 500;
    font-size: 1.2rem;
    color: var(--color-grey-500);
    text-transform: uppercase; 
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8.6rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  @media screen and (min-width: 440px) and (max-width: 540px) {
    grid-template-columns: 8.6rem 2rem 1fr 9rem;
    row-gap: 0.2rem;

    & ${NumNights} {
      grid-column: 3;
      grid-row: 2;
    }
  }

  @media screen and (max-width: 440px) {
    grid-template-columns: 2rem 1fr 9rem;
    row-gap: 1rem;

    & ${Guest} {
      grid-column: 2;
      grid-row: 1;
    }
    & ${Tag} {
      grid-column: 3;
      justify-self: center;
    }
    & ${NumNights} {
      grid-column: 2;
    }
    & ${Button} {
      grid-column: 3;
      grid-row: 2;
    }
    & ${Flag} {
      grid-column: 1;
      grid-row: 1;
    }
  }
`;



function TodayItem({ activity: { id, status, guests, numNights } }) {
  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
      {status === 'checked-in' && <Tag type='blue'>Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <NumNights>{numNights} nights</NumNights>
      {status === 'unconfirmed' && <Button size="small" as={Link} to={`/checkin/${id}`}>Check in</Button>}
      {status === 'checked-in' &&  <Button size="small" as={Link} to={`/bookings/${id}`}>Check out</Button>}
    </StyledTodayItem>
  )
}

export default TodayItem

