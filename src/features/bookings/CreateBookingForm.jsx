import styled from "styled-components";
import { addDays, differenceInDays, format } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCabins } from '../cabins/useCabins';
import { useSettings } from '../settings/useSettings';
import { useGuests } from '../guests/useGuests';
import { useAllBookings } from './useAllBookings';
import { useCreateBooking } from './useCreateBooking';

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import ImageRadio from "../../ui/ImageRadio";
import SpinnerContainer from "../../ui/SpinnerContainer";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  background-color: var(--color-grey-0);
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-brand-600);
  }
`

function CreateBookingForm({ onCloseModal }) {
  const { control, register, getValues, reset, handleSubmit, formState: { errors } } = useForm();
  const { isLoading, cabins } = useCabins();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isLoading: isLoadingGuests, guests = [] } = useGuests(true);
  const { isLoading: isLoadingBookings, allBookings } = useAllBookings();
  const { isCreating, createBooking } = useCreateBooking();
  const [selectedCabin, setSelectedCabin] = useState();
  const [numGuests, setNumGuests] = useState(0);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const numNights = differenceInDays(endDate, startDate);

  if (isLoading || isLoadingSettings || isLoadingGuests || isLoadingBookings)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )

  const guestsOptions = guests.map(guest => ({
    label: guest.fullName,
    value: guest.id
  }));
  const cabin = cabins.find(cabin => cabin.id === selectedCabin);
  const sortedCabin = cabins.slice().sort((a, b) => a.name.localeCompare(b.name));
  const price = (cabin?.regularPrice - cabin?.discount) * numNights || 0;
  const breakfastPrice = hasBreakfast ? settings.breakfastPrice * numGuests * numNights || 0 : 0;
  const totalPrice = price + breakfastPrice;

  const onSubmit = data => {
    const newBooking = {
      ...data,
      numNights,
      hasBreakfast: data.hasBreakfast === 'true',
      isPaid: data.isPaid === 'true',
      cabinPrice: price,
      extrasPrice: breakfastPrice,
      totalPrice
    };
    const bookedCabins = allBookings.filter(booking => booking.cabins.id === +data.cabinId);
    const bookedCabin = bookedCabins.find(({ startDate, endDate }) =>
      (data.startDate >= new Date(startDate) && data.startDate <= new Date(endDate)) || (data.endDate >= new Date(startDate) && data.endDate <= new Date(endDate)) || (data.startDate <= new Date(startDate) && data.endDate >= new Date(endDate))
    );
    if (bookedCabin) return toast.error(`This cabin has been booked from ${format(new Date(bookedCabin.startDate), "dd/MM/yyyy")} to ${format(new Date(bookedCabin.endDate), "dd/MM/yyyy")}! Please choose another cabin 😓`);
    createBooking(newBooking, {
      onSuccess: () => {
        onCloseModal?.();
        reset();
      }
    })
  }

  return (
    <Form type={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Start date' error={errors.startDate?.message} controllLabel='startDate'>
        <Controller
          control={control}
          name="startDate"
          defaultValue={startDate}
          rules={{
            required: 'This field is required',
          }}
          render={({ field: { onChange, ...field } }) =>
            <StyledDatePicker
              id="startDate"
              dateFormat='dd/MM/yyyy'
              selected={field.value}
              onChange={date => {
                setStartDate(date);
                onChange(date)
              }}
              {...field} />}
        />
      </FormRow>
      <FormRow label='End date' error={errors.endDate?.message} controllLabel='endDate'>
        <Controller
          control={control}
          name="endDate"
          defaultValue={endDate}
          rules={{
            validate: value => (+value > +getValues().startDate && numNights <= settings.maxBookingLength) || `End date cannot be earlier than start date and less than ${settings.maxBookingLength} days`
          }}
          render={({ field: { onChange, ...field } }) =>
            <StyledDatePicker
              id="endDate"
              dateFormat='dd/MM/yyyy'
              selected={field.value}
              onChange={date => {
                setEndDate(date);
                onChange(date);
              }}
              {...field} />}
        />
      </FormRow>

      <FormRow label='Guest' error={errors.guestId?.message}>
        <Select
          id='guestId'
          label="Select guest..."
          isModal={true}
          options={guestsOptions}
          {...register('guestId', {
            required: 'This field is required',
          })} />
      </FormRow>

      <FormRow label='Number of guests' error={errors.numGuests?.message}>
        <Input type="number" onInput={e => setNumGuests(+e.target.value)} id="numGuests" {...register('numGuests', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Guests should be at least 1'
          }
        })} />
      </FormRow>

      <FormRowVertical label='Cabin' error={errors.cabinId?.message}>
        <ImageRadio datas={sortedCabin} onInput={e => setSelectedCabin(+e.target.value)} {...register('cabinId', {
          required: 'You need to choose a cabin'
        })} />
      </FormRowVertical>

      <FormRow label='Status' error={errors.status?.message}>
        <Select
          id='status'
          label="Status..."
          isModal={true}
          options={[
            { label: 'Unconfirmed', value: 'unconfirmed' },
            { label: 'Checked in', value: 'checked-in' },
            { label: 'Checked out', value: 'checked-out' }
          ]}
          {...register('status', {
            required: 'This field is required',
          })} />
      </FormRow>

      <FormRow label='Breakfast' error={errors.hasBreakfast?.message}>
        <Select
          id='hasBreakfast'
          label="Has break fast?"
          isModal={true}
          onInput={e => setHasBreakfast(e.target.value === 'true')}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          {...register('hasBreakfast', {
            required: 'This field is required',
          })} />
      </FormRow>

      <FormRow label='Paid' error={errors.isPaid?.message}>
        <Select
          id='isPaid'
          label="Has paid yet?"
          isModal={true}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          {...register('isPaid', {
            required: 'This field is required',
          })} />
      </FormRow>

      <FormRow label='Cabin price'>
        <Input $isBooking={true} type="number" value={price} id="cabinPrice" disabled />
      </FormRow>

      <FormRow label='Extras price'>
        <Input $isBooking={true} type="number" value={breakfastPrice} id="extrasPrice" disabled />
      </FormRow>

      <FormRow label='Total price'>
        <Input $isBooking={true} type="number" value={totalPrice} id="totalPrice" disabled />
      </FormRow>

      <FormRow label='Observations' error={errors.observations?.message}>
        <Textarea type="text" id="observations" {...register('observations')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={() => {
          onCloseModal?.();
        }}>
          Cancel
        </Button>
        <Button $variation='primary'>{isCreating ? <SpinnerMini /> : 'Create new booking'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateBookingForm
