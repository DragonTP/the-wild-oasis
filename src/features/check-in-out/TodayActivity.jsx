import { useTodayActivity } from "./useTodayActivity";
import styled from "styled-components";
import TodayItem from './TodayItem';

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (max-width: 1375px) {
    height: 24rem;
    overscroll-behavior: auto;
  }
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {isLoading ? <Spinner /> : (
        !activities.length ? <NoActivity>There is no activity yet</NoActivity> : (
          <TodayList>
            {activities.map(activity => <TodayItem key={activity.id} activity={activity} />)}
          </TodayList>
        )
      )}
    </StyledToday>
  );
}

export default TodayActivity;
