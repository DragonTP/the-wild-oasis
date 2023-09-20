import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { convertToFlag } from '../../utils/helpers';

import { useCountries } from '../../hooks/useCountries';
import { useCreateGuest } from './useCreateGuest';

import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import SpinnerContainer from '../../ui/SpinnerContainer';

const GuestForm = styled(Form)`
  @media screen and (max-width: 645px) {
    & > div {
     grid-template-columns: 13rem .8fr;
    }
  }
`

// With NEW modal
// function CreateGuest({ onSuccessNewGuest, setIsOpenForm }) {
function CreateGuestForm({ onSuccessNewGuest, onCloseModal }) {
  const { isLoading: isLoadingCountries, countries } = useCountries();
  const { isCreating, createGuest } = useCreateGuest();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  if (isLoadingCountries) return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
  const countryOptions = countries.map((country) => {
    return {
      label: `${convertToFlag(country.alpha2Code)}  ${country.name}`,
      value: country.name, 
    };
  });

  const onSubmit = function (data) {
    const countryFlag = countries.find(
      (country) => country.name === data.nationality
    ).flag;

    createGuest(
      { ...data, countryFlag },
      {
        // In the mutate function, we can ALSO use the onSuccess handler, just like in useMutation. Both will get called. This one also gets access to the returned value of the mutation (new guest in this case)
        // This is how we can get access to the newly created object. Here we set it into state, because we want to display it in the UI
        onSuccess: (data) => {
          // We might want to reuse this form in another place, and then onSuccessNewGuest will not exist
          onSuccessNewGuest?.(data);

          // If this component is used OUTSIDE the Modal Context, this will return undefined, so we need to test for this. Instead of if
          onCloseModal?.();
        },
      }
    );
  };

  return (
    <GuestForm type='modal' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isCreating}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isCreating}
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              // google: email regex JavaScript
              value: /\S+@\S+\.\S+/,
              message: 'Please specify a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow label='Nationality' error={errors?.nationality?.message}>
        <Select
          id='nationality'
          isModal={true}
          disabled={isCreating}
          label='Select nationality...'
          options={countryOptions}
          {...register('nationality', { required: 'This field is required' })}
        ></Select>
      </FormRow>

      <FormRow label='National ID' error={errors?.nationalID?.message}>
        <Input
          type='text'
          disabled={isCreating}
          id='nationalID'
          {...register('nationalID', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation='secondary'
          type='reset'
          disabled={isCreating}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add new guest</Button>
      </FormRow>
    </GuestForm>
  );
}

export default CreateGuestForm;
