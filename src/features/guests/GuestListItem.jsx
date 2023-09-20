import styled from 'styled-components';
import { Flag } from '../../ui/Flag';
import Menus from '../../ui/Menus';
import { HiTrash } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteGuest } from './useDeleteGuest';

const ID = styled.div`
  justify-self: right;
  font-size: 1.2rem;
  color: var(--color-grey-500);
`;

const StyledGuestListItem = styled.li`
  display: grid;
  grid-template-columns: 2rem 2fr 1fr 2.4rem;
  gap: 0.8rem;
  align-items: center;
  padding: 0.6rem 1.6rem;
  transition: all 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-grey-50);
    cursor: pointer;
  }

  @media screen and (max-width: 444px) {
    grid-template-columns: 2rem 1fr 2.4rem;
    grid-template-rows: auto auto;
    & ${ID} {
      grid-row: 2;
      grid-column: 2;
      justify-self: left;
    }
  }
`;



function GuestListItem({ guest, onClick }) {
  const { isDeleting, deleteGuest } = useDeleteGuest();

  return (
    <StyledGuestListItem onClick={() => onClick(guest)} role='button'>
      <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
      <div>{guest.fullName}</div>
      <ID>ID: {guest.nationalID}</ID>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={guest.id} />

          <Menus.List id={guest.id}>
            <Modal.Open opens='delete'>
              <Menus.Button disabled={isDeleting} icon={<HiTrash />}>Delete guest</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name='delete'>
          <ConfirmDelete resourceName='delete guest' onConfirm={() => deleteGuest(guest.id)} />
        </Modal.Window>
      </Modal>
    </StyledGuestListItem>
  );
}

export default GuestListItem;
