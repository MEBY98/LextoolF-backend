import mongoose from 'mongoose';
import archiver from 'archiver';
import fs from 'fs';
import { UbicationDto } from 'src/ubication/dto/ubication.dto';
import { ClasificationDto } from 'src/clasification/dto/clasification.dto';
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

export function deleteHtmlTags(str: string): string {
  if (str.indexOf('>') !== -1) {
    const firstRightArrowIndex = str.indexOf('>');
    const lastLeftArrowIndex = str.lastIndexOf('<');
    const subStr = str.slice(firstRightArrowIndex + 1, lastLeftArrowIndex);
    return deleteHtmlTags(subStr);
  }
  return str;
}

export function extractLemma(str: string) {
  const lemmaWithOutHtmlTags = deleteHtmlTags(str);
  if (
    lemmaWithOutHtmlTags.lastIndexOf('.') ===
    lemmaWithOutHtmlTags.length - 1
  ) {
    console.log(
      'lemmaSlice:',
      lemmaWithOutHtmlTags.slice(0, lemmaWithOutHtmlTags.length - 1),
    );
    return lemmaWithOutHtmlTags.slice(0, lemmaWithOutHtmlTags.length - 1);
  }
  return lemmaWithOutHtmlTags;
}

export function stream2buffer(stream) {
  return new Promise((resolve, reject) => {
    const buf = [];
    stream.on('data', chunk => buf.push[chunk]);
    stream.on('end', () => resolve(Buffer.concat(buf)));
    stream.on('error', err => reject(err));
  });
}
export function zipDirectory(source, out) {
  const archive = new archiver('zip');
  const stream = fs.createWriteStream(out);
  return new Promise<fs.WriteStream>((resolve, reject) => {
    stream.on('close', () => {
      resolve(stream);
    });
    stream.on('end', () => {
      resolve(stream);
    });
    stream.on('error', err => {
      reject(err);
    });
    archive.directory(source, false);
    archive.pipe(stream);
    archive.finalize();
  });
}

export function createMap(
  array: Array<any>,
  keyAttr: string,
  valueAttr: string,
) {
  const map = new Map<string, string>();
  array.forEach(element => {
    map.set(element[keyAttr], element[valueAttr]);
  });
  return map;
}
