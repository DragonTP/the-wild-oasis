import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput, { Image, useFileInput } from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { image, handlePreview, handleClear } = useFileInput();
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const onSubmit = data => {
    const newCabin = {
      ...data,
      maxCapacity: +data.maxCapacity,
      regularPrice: +data.regularPrice,
      discount: +data.discount,
      image: !data.image[0]?.name ? editValues.image : data.image[0]
    }

    if (editId && JSON.stringify(newCabin) === JSON.stringify(editValues)) return;
    editId ? editCabin({
      newCabin: { ...newCabin, oldImagePath: editValues.image },
      id: editId
    }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    }) : createCabin(newCabin, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    });
  }

  return (
    <Form type={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name' error={errors.name?.message}>
        <Input disabled={isEditSession ? isEditing : isCreating} type="text" id="name" {...register('name', {
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors.maxCapacity?.message}>
        <Input disabled={isEditSession ? isEditing : isCreating} type="number" id="maxCapacity" {...register('maxCapacity', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label='Regular price' error={errors.regularPrice?.message}>
        <Input disabled={isEditSession ? isEditing : isCreating} type="number" id="regularPrice" {...register('regularPrice', {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Capacity should be at least 1'
          }
        })} />
      </FormRow>

      <FormRow label='Discount' error={errors.discount?.message}>
        <Input disabled={isEditSession ? isEditing : isCreating} type="number" id="discount" defaultValue={0} {...register('discount', {
          required: 'This field is required',
          validate: value => +value <= +getValues().regularPrice || 'Discount should be less than regular price'
        })} />
      </FormRow>

      <FormRow label='Description for website' error={errors.description?.message}>
        <Textarea type="text" id="description" defaultValue="" {...register('description', {
          required: 'This field is required',
        })} />
      </FormRow>

      <FormRow label='Cabin photo' error={errors.image?.message}>
        <FileInput disabled={isEditSession ? isEditing : isCreating} onInput={handlePreview} id="image" accept="image/*" {...register('image', {
          required: isEditSession ? false : 'This field is required',
        })} />
        {image && <Image src={image} alt="Your file" />}
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={() => {
          onCloseModal?.();
          handleClear();
        }}>
          Cancel
        </Button>
        <Button disabled={isEditSession ? isEditing : isCreating} $variation='primary'>{(isEditSession ? isEditing : isCreating) ? 'Uploading' : (isEditSession ? 'Edit Cabin' : 'Create new cabin')}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
