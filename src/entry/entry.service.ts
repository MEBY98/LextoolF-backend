import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry } from './model/entry.modelinterface';
import { NewEntryType, EditedEntryType } from './type/entry.type';
import { UFService } from 'src/UF/UF.service';
// import { MinioService } from 'src/minIO/minio.service';
import { SublemmaService } from 'src/sublemma/sublemma.service';
import { LemmaService } from 'src/lemma/lemma.service';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel('Entry') private EntryModel: Model<Entry>,
    private readonly LemmaService: LemmaService,
    private readonly UFService: UFService,
    private readonly SublemmaService: SublemmaService,
  ) {}

  async findAll() {
    const e = await this.EntryModel.find()
      .populate({
        path: 'lemma',
        model: 'Lemma',
        populate: {
          path: 'clasification',
          model: 'Clasification',
        },
      })
      .populate({
        path: 'sublemmas',
        model: 'Sublemma',
        populate: {
          path: 'clasification',
          model: 'Clasification',
        },
      })
      .populate({
        path: 'UFs',
        model: 'UF',
        populate: {
          path: 'descriptors',
          model: 'Descriptor',
        },
      })
      .populate({
        path: 'UFs',
        model: 'UF',
        populate: {
          path: 'ubication',
          model: 'Ubication',
        },
      })
      .exec();
    return e;
  }

  async findById(id: string) {
    const e = await this.EntryModel.findById(id)
      .populate({ path: 'lemma', model: 'Lemma' })
      .populate({ path: 'sublemmas', model: 'Sublemma' })
      .populate({ path: 'UFs', model: 'UF' })
      .exec();
    console.log('EntryFindByID:', e);
    return e;
  }

  async createEntry(entry: NewEntryType) {
    const UFsIDs = [];
    const SublemmasIDs = [];

    const LemmaID = (await this.LemmaService.createLemma(entry.lemma)).id;

    entry.sublemmas.forEach(element => {
      const newSublemma = this.SublemmaService.createSublemma(element);
      SublemmasIDs.push(newSublemma.id);
    });
    console.log('ID de los nuevos Sublemas:', SublemmasIDs);

    entry.UFs.forEach(element => {
      const newUF = this.UFService.createUF(element);
      UFsIDs.push(newUF.id);
    });
    console.log('ID de las nuevas UFs:', UFsIDs);

    const e = new this.EntryModel({
      letter: entry.letter,
      context: entry.context,

      lemma: LemmaID,
      UFs: UFsIDs,
      sublemmas: SublemmasIDs,
    });
    console.log('ready entry:', e);
    const result = await (await e.save())
      .populate({ path: 'UFs', model: 'UF' })
      .populate({ path: 'lemma', model: 'Lemma' })
      .populate({ path: 'sublemmas', model: 'Sublemma' })

      .execPopulate();
    console.log('result:', result);
    return result;
  }

  async updateEntry(editedEntry: EditedEntryType) {
    const oldEntry = await this.EntryModel.findById(editedEntry.id).exec();
    if (oldEntry) {
      oldEntry.letter = editedEntry.letter;
      oldEntry.context = editedEntry.context;

      const newSublemasIDs = [];
      const newUFsIDs = [];

      this.LemmaService.updateLemma(editedEntry.lemma);

      if (oldEntry.sublemmas.length > 0) {
        for (
          let indexOES = 0;
          indexOES < oldEntry.sublemmas.length;
          indexOES++
        ) {
          const OES = oldEntry.sublemmas[indexOES];
          let found = false;
          if (editedEntry.sublemmas.length > 0) {
            for (
              let indexEES = 0;
              indexEES < editedEntry.sublemmas.length && !found;
              indexEES++
            ) {
              const EES = editedEntry.sublemmas[indexEES];
              if (EES.id) {
                if (OES.toString() === EES.id.toString()) {
                  console.log('EES.id:', EES.id);
                  console.log('OES:', OES);
                  found = true;
                  this.SublemmaService.updateSublemma(EES);
                }
              }
            }
          }
          if (!found) {
            this.SublemmaService.deleteSublemma(OES);
            oldEntry.sublemmas = oldEntry.sublemmas.filter(s => s != OES);
          }
        }
      }
      if (editedEntry.sublemmas.length > 0) {
        for (
          let indexEES = 0;
          indexEES < editedEntry.sublemmas.length;
          indexEES++
        ) {
          const EES = editedEntry.sublemmas[indexEES];
          if (!EES.id) {
            const s = this.SublemmaService.createSublemma({
              sublemma: EES.sublemma,
              clasification: EES.clasification,
            });
            newSublemasIDs.push(s.id);
          }
        }
      }

      if (oldEntry.UFs.length > 0) {
        for (
          let indexOEUFs = 0;
          indexOEUFs < oldEntry.UFs.length;
          indexOEUFs++
        ) {
          const OEUFs = oldEntry.UFs[indexOEUFs];
          let found = false;
          if (editedEntry.UFs.length > 0) {
            for (
              let indexEEUFs = 0;
              indexEEUFs < editedEntry.UFs.length && !found;
              indexEEUFs++
            ) {
              const EEUFs = editedEntry.UFs[indexEEUFs];
              if (EEUFs.id) {
                if (OEUFs.toString() === EEUFs.id.toString()) {
                  found = true;
                  this.UFService.updateUF(EEUFs);
                }
              }
            }
          }
          if (!found) {
            this.UFService.deleteUF(OEUFs);
            oldEntry.UFs = oldEntry.UFs.filter(uf => uf != OEUFs);
          }
        }
      }
      if (editedEntry.UFs.length > 0) {
        for (
          let indexEEUFs = 0;
          indexEEUFs < editedEntry.UFs.length;
          indexEEUFs++
        ) {
          const EEUFs = editedEntry.UFs[indexEEUFs];
          if (!EEUFs.id) {
            const uf = await this.UFService.updateUF(EEUFs);
            newUFsIDs.push(uf.id);
          }
        }
      }
      oldEntry.sublemmas.push(...newSublemasIDs);
      oldEntry.UFs.push(...newUFsIDs);
      console.log('oldEntryReady:', oldEntry);
      oldEntry.save();

      // const { UFs, sublemmas, lemma, letter, context, id } = oldEntry;

      // console.log('oldEntryReady:', oldEntry);
      // this.EntryModel.findByIdAndUpdate(oldEntry.id, {
      //   UFs,
      //   sublemmas,
      //   lemma,
      //   letter,
      //   context,
      // });
    } else {
      throw new Error('Entry not Found');
    }
  }

  async deleteEntryByID(entryID: string) {
    const e = await this.EntryModel.findById(entryID);
    if (!e) {
      throw new Error(`Entrada con id: ${entryID} no existe`);
    }
    return await e.deleteOne();
  }

  async entryUbicationsByID(entryID: string) {
    const e = await this.EntryModel.findById(entryID).exec();
    const ubications = [];
    e.UFs.forEach(element => {
      ubications.push(
        this.UFService.ubicationByUFID(element).then(u => u.ubication),
      );
    });
    console.log('entryUbicationsByID:', ubications);
    return ubications;
  }
}
