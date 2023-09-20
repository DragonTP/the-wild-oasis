import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateBookingForm from "./CreateBookingForm"

function AddBooking() {
  return (
    <>
      <div>
        <Modal.Open opens='add-booking'>
          <Button>Add new booking</Button>
        </Modal.Open>
      </div>

      <Modal.Window name='add-booking'>
        <CreateBookingForm />
      </Modal.Window>
    </>
  )
}

export default AddBooking
