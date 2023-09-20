import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, bookings, error, count } = useBookings();

  if (isLoading) return <Spinner />
  if (error) return <p>{error.message}</p>
  if (!bookings.length) return <Empty resource='bookings' />

  return (
    <Menus>
      <Table columns="1fr 2fr 2.4fr 1.4fr 1fr 3.2rem" responsive={{
        columns: '6.4rem 12rem 14rem 12rem 10rem 3.2rem',
        breakpoint: 1130
      }}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div style={{ marginLeft: '1rem' }}>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
