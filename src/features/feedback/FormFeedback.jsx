import styled from "styled-components";
import { useEffect, useState } from "react";
import { useBooking } from "../bookings/useBooking"
import { useForm } from "react-hook-form";
import { useAddFeedback } from "./useAddFeedback";
import { useGetIdFeedbacks } from "./useGetIdFeedbacks";

import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import Textarea from "../../ui/Textarea";
import FormRowVertical from "../../ui/FormRowVertical";
import StarRating from './StarRating'
import Button from "../../ui/Button";
import { useParams } from "react-router-dom";

const Empty = styled.h3`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2.4rem;

  @media screen and (max-width: 500px) {
    font-size: 1.8rem;
  }
`
const ContainerRadio = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  grid-column: 2 / span 2;

  @media screen and (max-width: 712px) {
    gap: 2rem;
  }

  @media screen and (max-width: 545px) {
    justify-content: start;
  }
`

const LabelRadio = styled.label`
  display: flex;
  gap: 1rem;
`

function FormFeedback({ doneForm }) {
  const { isLoading, booking, error } = useBooking();
  const { isLoading: isLoadingFeedbacks, feedbacks } = useGetIdFeedbacks();
  const { isAdding, addFeedback } = useAddFeedback();
  const { bookingId } = useParams();
  const [rating, setRating] = useState();
  const [errorRating, setErrorRating] = useState('');
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (feedbacks?.some(fb => fb.bookingId === +bookingId)) doneForm();
  }, [feedbacks, doneForm, bookingId])

  const onSubmit = data => {
    if (!rating) return setErrorRating('You need to rate our service');
    const newFeedback = {
      ...data,
      guestId: booking.guestId,
      cabinId: booking.cabinId,
      bookingId: booking.id,
      rating,
      isRecommend: data.isRecommend && data.isRecommend === 'yes'
    }
    addFeedback(newFeedback, {
      onSuccess: () => doneForm()
    })
  }

  if (isLoading || isLoadingFeedbacks) return <Spinner />
  if (error || booking.status !== 'checked-out') return <Empty>This booking has't been checked out yet or doesn't exist</Empty>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' disabledError={true}>
        <Input $isBooking={true} defaultValue={booking.guests.fullName} id='fullName' disabled type="text" />
      </FormRow>
      <FormRow label='Email' disabledError={true}>
        <Input $isBooking={true} defaultValue={booking.guests.email} id='email' disabled type="text" />
      </FormRow>
      <FormRow label='Cabin name' disabledError={true}>
        <Input $isBooking={true} defaultValue={booking.cabins.name} id='email' disabled type="text" />
      </FormRow>
      <FormRow label='Rate our services (*)' disabledError={true} error={errorRating}>
        <StarRating maxRating={5} onSetRating={setRating} size={28} messages={['Very bad', 'Bad', 'Normal', 'Good', 'Very good']} />
      </FormRow>
      <FormRowVertical addBorder={true} label='What did you like best?'>
        <Textarea type='text' id='favourites' {...register('favourites')} />
      </FormRowVertical>
      <FormRowVertical addBorder={true} label='How can we improve?'>
        <Textarea type='text' id='improveThings' {...register('improveThings')} />
      </FormRowVertical>
      <FormRow label='Would you recommend us to your friend?'>
        <ContainerRadio>
          <LabelRadio htmlFor="yes">
            <Input type="radio" id="yes" value='yes' {...register('isRecommend')} />
            <span>Yes</span>
          </LabelRadio>
          <LabelRadio>
            <Input type="radio" {...register('isRecommend')} />
            <span>No</span>
          </LabelRadio>
        </ContainerRadio>
      </FormRow>
      <FormRowVertical addBorder={true} label='Anything else you would like to add?'>
        <Textarea type='text' id='addThings'  {...register('addThings')} />
      </FormRowVertical>
      <FormRow>
        <Button disabled={isAdding}>{isAdding ? <SpinnerMini /> : 'Send feedback'}</Button>
      </FormRow>
    </Form>
  )
}

export default FormFeedback
