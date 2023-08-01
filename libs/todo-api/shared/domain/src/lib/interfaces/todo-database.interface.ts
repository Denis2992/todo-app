import { ObjectId } from 'mongoose';

export interface TodoDB {
  _id: ObjectId;
  title: string;
  checked: boolean;
  index: number;
}
