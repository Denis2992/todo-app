import mongoose, { Schema } from 'mongoose';
import { todoSchema } from './todo.schema';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  todos: {
    type: [todoSchema],
    ref: 'Todo',
  },
});

export const User = mongoose.model('User', userSchema);
