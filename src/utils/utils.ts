import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export function toObjectId(id: string) {
  return id ? new ObjectId(id) : null;
}

export function toObjectIds(elements: string[]) {
  const ids: mongoose.Types.ObjectId[] = [];

  for (let i = 0; i < elements.length; i++) {
    ids[i] = toObjectId(elements[i]);
  }

  return ids;
}
