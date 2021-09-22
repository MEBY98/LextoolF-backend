import { MongoClient } from 'mongodb';
import { Logger } from '@nestjs/common';
import { Collection } from 'mongoose';
import mongoose from 'mongoose';

export const getDb = async () => {
  return mongoose
    .connect('mongodb://localhost/Dictionary', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(conn => {
      return conn.connection.db;
    });
};

export const getCollection = async (
  collectionName: string,
): Promise<Collection> => {
  return getDb()
    .then(db => {
      return db.collection(collectionName);
    })
    .catch(e => {
      Logger.verbose(e);
      return e;
    });
};

export const insertDescriptor = async (
  collectionName: string,
  description: string,
) => {
  return getCollection(collectionName).then(coll => {
    if (coll) {
      return coll.insertOne({ description: description }).then(insertedDoc => {
        return insertedDoc.ops;
      });
    } else {
      throw new Error('No existe la coleccion');
    }
  });
};
export const insertManyDescriptors = async (
  collectionName: string,
  descriptors: string[],
) => {
  const ids: mongoose.Types.ObjectId[] = [];
  for (let i = 0; i < descriptors.length; i++) {
    const d = descriptors[i];
    const ops = await insertDescriptor(collectionName, d);
    ids.push(ops[0]._id);
  }
  return ids;
};

export const insertDocument = async (collectionName: string, doc: any) => {
  return getCollection(collectionName).then(coll => {
    if (coll) {
      return coll.insertOne(doc).then(insertedDoc => {
        return insertedDoc.ops;
      });
    } else {
      throw new Error('No existe la coleccion');
    }
  });
};

export const insertManyDocuments = async (
  collectionName: string,
  docs: any[],
) => {
  const ids: mongoose.Types.ObjectId[] = [];
  for (let i = 0; i < docs.length; i++) {
    const d = docs[i];
    const ops = await insertDocument(collectionName, d);
    ids.push(ops[0]._id);
  }
  return ids;
};
