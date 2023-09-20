import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => cur.totalPrice + acc, 0);
  const checkins = confirmedStays.length;
  const occupation = (confirmedStays.reduce((acc, cur) => cur.numNights > numDays ? acc + numDays : acc + cur.numNights, 0) / (cabinCount * numDays) * 100).toFixed(2);

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title='Sales' color='green' icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title='Occupancy rate' color='yellow' icon={<HiOutlineChartBar />} value={`${occupation}%`} />
    </>
  )
}

export default Stats
