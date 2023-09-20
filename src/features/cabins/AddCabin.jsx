import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal"
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <Modal>
      <div>
        <Modal.Open opens='add-cabin'>
          <Button>Add new cabin</Button>
        </Modal.Open>
      </div>

      <Modal.Window name='add-cabin'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  )
}

export default AddCabin
