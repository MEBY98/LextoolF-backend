import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './model/entry.modelinterface';
import { NewEntryType, EditedEntryType } from './type/entry.type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ElementService } from 'src/element/element.service';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel('Entry') private EntryModel: Model<Entry>,
    private readonly ElementService: ElementService,
  ) {}

  async findAll() {
    return this.EntryModel.find()
      .populate({
        path: 'elements',
        model: 'Element',
        populate: { path: 'clasification', model: 'Clasification' },
      })
      .populate({
        path: 'elements',
        model: 'Element',
        populate: { path: 'ubication', model: 'Ubication' },
      })
      .exec()
      .then(allEntries => allEntries)
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async findByIdAsync(id: string) {
    return this.EntryModel.findById(id)
      .populate({
        path: 'elements',
        model: 'Element',
      })
      .exec()
      .then(entry => entry)
      .catch(err => {
        Logger.verbose(['e2', err]);
        return err;
      });
  }

  findById(id: string) {
    return this.EntryModel.findById(id)
      .populate({
        path: 'elements',
        model: 'Element',
        populate: { path: 'clasification', model: 'Clasification' },
      })
      .populate({
        path: 'elements',
        model: 'Element',
        populate: { path: 'ubication', model: 'Ubication' },
      })
      .exec()
      .then(entry => entry)
      .catch(err => {
        Logger.verbose(['e2', err]);
        return err;
      });
  }

  createEntry(entry: NewEntryType) {
    const elementsIDs = [];

    if (entry.elements.length > 0) {
      entry.elements.forEach(e => {
        const ne = this.ElementService.create(e);
        elementsIDs.push(ne.id);
      });
    }

    const newEntry = new this.EntryModel({
      letter: entry.letter,
      context: entry.context,
      elements: elementsIDs,
    });
    newEntry.save();
    return newEntry;
  }

  async updateEntry(editedEntry: EditedEntryType) {
    return this.EntryModel.findById(editedEntry.id)
      .exec()
      .then(oldEntry => {
        const newElements = editedEntry.elements;
        if (oldEntry) {
          if (oldEntry.elements.length > 0) {
            oldEntry.elements.forEach(OEE => {
              let found = false;
              let indexEE = 0;
              if (newElements.length > 0) {
                for (; indexEE < newElements.length && !found; indexEE++) {
                  const EE = newElements[indexEE];
                  if (EE.id) {
                    if (EE.id.toString() === OEE.toString()) {
                      found = true;
                      this.ElementService.edit(EE);
                    }
                  }
                }
              }
              if (!found) {
                this.ElementService.delete(OEE);
                oldEntry.elements = oldEntry.elements.filter(e => e != OEE);
              }
            });
          }

          for (let indexEE = 0; indexEE < newElements.length; indexEE++) {
            const EE = newElements[indexEE];
            if (!EE.id) {
              const ne = this.ElementService.create(EE);
              oldEntry.elements.push(ne.id);
            }
          }
          const { context, letter } = editedEntry;
          oldEntry.context = context;
          oldEntry.letter = letter;

          return oldEntry.save().then(() => {
            return this.findById(editedEntry.id).then(
              ODFullPopulated => ODFullPopulated,
            );
          });
        } else {
          throw new Error('No se encontro la entrada seleccionada');
        }
      })
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async deleteEntryByID(entryID: string) {
    return this.EntryModel.findByIdAndDelete(entryID)
      .exec()
      .then(deleted => (deleted ? true : false))
      .catch(e => {
        Logger.verbose(e);
        return e;
      });
  }

  async entryUbicationsByID(entryID: string) {
    return this.EntryModel.findById(entryID)
      .exec()
      .then(async entry => {
        const ubications: string[] = [];
        for (let indexE = 0; indexE < entry.elements.length; indexE++) {
          const element = entry.elements[indexE];
          const u = await this.ElementService.ubicationByElementID(element);
          ubications.push(u.ubication);
        }
        return ubications;
      });
  }
}
