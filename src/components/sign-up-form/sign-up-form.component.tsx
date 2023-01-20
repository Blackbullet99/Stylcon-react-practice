import FormInput from "../form-input/form-input.component";
import { SignUpContainer } from "./sign-up-form.styles";

import Button from "../button/button.component";

import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";

import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      dispatch(signUpStart(displayName, email, password));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formField, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
