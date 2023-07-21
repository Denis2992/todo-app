import { ValidationError } from 'express-validator';

export class ApiError extends Error {
  status?: number | string;
  data?: ValidationError[];
}
