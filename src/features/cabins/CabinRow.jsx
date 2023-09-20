import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers'
import SpinnerMini from "../../ui/SpinnerMini";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 100%;
  max-width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { deleteCabin, deleteStatus } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  if (deleteStatus !== 'idle' && deleteStatus !== 'error') return (
    <div style={{
      display: "flex",
      padding: '.8rem',
      justifyContent: 'center',
      alignItems: "center"
    }}>
      <SpinnerMini />
    </div>
  )
  const handleDuplicate = () => {
    const newCabin = { ...cabin };
    delete newCabin.id;
    delete newCabin.created_at;
    createCabin({
      ...newCabin,
      name: `Copy of ${newCabin.name}`,
      isDuplicate: true,
    })
  }
  return (
    <Table.Row>
      <Img src={cabin.image} alt='' />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      {cabin.discount ? <Discount>{formatCurrency(cabin.discount)}</Discount> :
        <span>&mdash;</span>}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id} />

          <Menus.List id={cabin.id}>
            <Menus.Button disabled={isCreating} onClick={handleDuplicate} icon={<HiSquare2Stack />}> Duplicate</Menus.Button>
            <Modal.Open opens='edit'>
              <Menus.Button icon={<HiPencil />}> Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}> Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name='edit'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='cabins' onConfirm={() => deleteCabin(cabin)} />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row >
  )
}

export default CabinRow
