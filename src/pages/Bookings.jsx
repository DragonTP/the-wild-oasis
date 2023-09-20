import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Modal from "../ui/Modal";
import AddBooking from "../features/bookings/AddBooking";

function Bookings() {
  return (
    <Modal>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <Row>
        <BookingTable />
        <AddBooking />
      </Row>
    </Modal>
  );
}

export default Bookings;
