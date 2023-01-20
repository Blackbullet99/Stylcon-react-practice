import FormInput from "../form-input/form-input.component";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formField, setFormFields] = useState(defaultFormField);
  const { email, password } = formField;

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_EMAIL:
          alert("Incorrect password for email");
          break;
        case AuthErrorCodes.MFA_INFO_NOT_FOUND:
          alert("No user associated with this email");
          break;
        default:
          console.log("User not found", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formField, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
