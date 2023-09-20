import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from '../cabins/useCabins';
import Spinner from '../../ui/Spinner';
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  @media screen and (max-width: 1375px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: unset;
  }

  @media screen and (max-width: 500px) {
    & > div {
      grid-column: 1 / -1;
    }
  }
`;

function DashboardLayout() {
  const { isLoading, recentBookings, numDays } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={recentBookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
