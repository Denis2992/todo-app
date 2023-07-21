import { LoginPayload } from './login.payload';

export interface SignupPayload extends LoginPayload {
  name: string;
  confirmPassword: string;
}
