import mongoose, { Schema } from 'mongoose';

export const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  index: {
    type: Number,
  },
});

export const Todo = mongoose.model('Todo', todoSchema);
