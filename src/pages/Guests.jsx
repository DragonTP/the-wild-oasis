import Heading from "../ui/Heading";
import Row from "../ui/Row";
import GuestList from '../features/guests/GuestList'
import AddGuest from '../features/guests/AddGuest'

function Guests() {
  return (
    <>
      <Heading>All guests</Heading>

      <Row>
        <GuestList />
        <AddGuest />
      </Row>
    </>
  )
}

export default Guests
