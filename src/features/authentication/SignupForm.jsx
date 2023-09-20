import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const { isCreating, signup } = useSignup();

  const onSubmit = data => {
    const newUser = {
      fullName: data.fullName,
      email: data.email,
      password: data.password
    }
    signup(newUser, {
      onSettled: () => reset()
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName', {
          required: 'This field is required'
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input type="email" id="email" {...register('email', {
          required: 'This field is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address"
          }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" validatePassword={true} error={errors.password?.message}>
        <Input type="password" id="password" {...register('password', {
          required: 'Your password must be at least 8 characters long, must contain at least 1 uppercase character, 1 lowercase character, 1 numeric character',
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
            message: 'Your password must be at least 8 characters long, must contain at least 1 uppercase character, 1 lowercase character, 1 numeric character'
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm', {
          required: 'Password need to match',
          validate: value => value === watch('password') || 'Password need to match'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isCreating} $variation="secondary" onClick={reset} type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating ? <SpinnerMini /> : 'Create new user'}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
