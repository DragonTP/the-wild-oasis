import { useState } from "react";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import FileInput, { Image, useFileInput } from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import { useDeleteAvatar } from "./useDeleteAvatar";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();
  const { isDeleting, deleteAvatar } = useDeleteAvatar();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { image, handlePreview, handleClear } = useFileInput();

  const handleSubmit = e => {
    e.preventDefault();
    if (!fullName || (fullName === currentFullName && !avatar)) return;
    updateUser({ fullName, avatar, oldAvatarPath: currentAvatar }, {
      onSuccess: () => {
        toast.success('Your user data has been updated!');
        handleClear();
        e.target.reset();
        setAvatar(null);
      }
    })
  }

  const handleCancel = () => {
    handleClear();
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onInput={handlePreview}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        {image && <Image src={image} alt="Your avatar" />}
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating || isDeleting} type="reset" $variation="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        {currentAvatar && (
          <Modal>
            <Modal.Open opens='delete'>
              <Button $variation='danger' type="button">Delete avatar</Button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete resourceName='avatar' onConfirm={() => deleteAvatar(currentAvatar)} />
            </Modal.Window>
          </Modal>
        )}
        <Button disabled={isUpdating || isDeleting}>{isUpdating ? <SpinnerMini /> : 'Update account'}</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
