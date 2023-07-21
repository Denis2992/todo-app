import { SignupSuccessPayload } from './signup-success.payload';

export interface LoginSuccessPayload extends SignupSuccessPayload {
  token: string;
}
