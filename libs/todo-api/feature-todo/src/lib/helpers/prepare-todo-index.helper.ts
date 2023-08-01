import mongoose from 'mongoose';

import { User } from '@todo-api/shared/domain';

export const prepareTodoIndex = async (id: string): Promise<number> => {
  const aggregatedData = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: '$todos' },
    { $group: { _id: null, count: { $count: {} } } },
  ]);

  if (aggregatedData.length === 0) {
    return 0;
  } else {
    return aggregatedData[0].count;
  }
};
