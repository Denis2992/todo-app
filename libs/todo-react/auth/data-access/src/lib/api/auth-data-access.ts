import {
  LoginSuccessPayload,
  SignupSuccessPayload,
} from '@todo-app/shared/domain';
import { LoginPayload, SignupPayload } from '@todo-app/shared/domain';

export async function loginUser(
  payload: LoginPayload
): Promise<LoginSuccessPayload> {
  const res = await fetch(`${process.env.NX_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
    }),
  });

  if (res.status === 401) {
    throw new Error('Wrong email or password.');
  }

  if (res.status !== 200) {
    throw new Error('Something went wrong! Please try again.');
  }

  return await res.json();
}

export async function signupUser(
  payload: SignupPayload
): Promise<SignupSuccessPayload> {
  const res = await fetch('api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email,
      name: payload.name,
      password: payload.password,
    }),
  });

  if (res.status === 422) {
    throw new Error(
      "Validation failed. Make sure the email address isn't used yet!"
    );
  }

  if (res.status !== 201) {
    throw new Error('Something went wrong! Please try again.');
  }

  return await res.json();
}
