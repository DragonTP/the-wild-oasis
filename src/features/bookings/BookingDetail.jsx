import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { sendEmail, useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  @media screen and (max-width: 450px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;

    & + button {
      align-self: flex-start;
    }
  }
`;

function BookingDetail() {
  const { isLoading, booking, error } = useBooking();
  const { isCheckingout, checkout } = useCheckout();
  const { deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />
  if (error) return <Empty resource='booking' />

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>{booking.status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === 'unconfirmed' &&
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>}

        {booking.status === 'checked-in' &&
          <Button onClick={() => checkout(booking.id, {
            onSuccess: () => sendEmail(booking)
          })} disabled={isCheckingout}>
            Check out
          </Button>}
        <Modal>
          <Modal.Open>
            <Button $variation='danger'>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete resourceName='booking' onConfirm={() => {
              deleteBooking(booking.id, {
                onSuccess: () => navigate('/bookings')
              });
            }} />
          </Modal.Window>
        </Modal>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
