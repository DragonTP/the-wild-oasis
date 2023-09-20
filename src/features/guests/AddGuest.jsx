import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import CreateGuestForm from './CreateGuestForm'

function AddGuest() {
  return (
    <Modal>
      <div>
        <Modal.Open opens='create-guest'>
          <Button>Create new guest</Button>
        </Modal.Open>
      </div>
      <Modal.Window name='create-guest'>
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  )
}

export default AddGuest
