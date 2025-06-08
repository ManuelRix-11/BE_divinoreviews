import {WineModel} from '../models/Wine';
import { Wine } from '../models/Wine';

export class WineService {

    async create(wine: Wine): Promise<Wine> {
    const created = new WineModel({
      _title: wine.title,
      _variety: wine.variety,
      _winery: wine.winery,
      _country: wine.country,
      _province: wine.province,
      _description: wine.description,
      _region_1: wine.region_1,
      _region_2: wine.region_2,
      _designation: wine.designation,
      _price: wine.price,
    });

    const saved = await created.save();
    wine.id = saved._id?.toString();
    return wine;
  }

async getAll(): Promise<Wine[]> {
  const docs = await WineModel.find();
  return docs.map(doc => new Wine(
    doc._title,
    doc._variety,
    doc._winery,
    doc._country,
    doc._province,
    doc._description,
    doc._region_1 ?? '',
    doc._region_2 ?? '',
    doc._designation ?? '',
    doc._price ?? 0,
    doc._id?.toString()
  ));
}

async update(id: string, data: Partial<Wine>): Promise<Wine | null> {
  const updatedDoc = await WineModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedDoc) return null;

  return new Wine(
    updatedDoc._title,
    updatedDoc._variety,
    updatedDoc._winery,
    updatedDoc._country,
    updatedDoc._province,
    updatedDoc._description,
    updatedDoc._region_1 ?? '',
    updatedDoc._region_2 ?? '',
    updatedDoc._designation ?? '',
    updatedDoc._price ?? 0,
    updatedDoc._id?.toString()
  );
}


  async delete(id: string): Promise<void> {
    await WineModel.findByIdAndDelete(id);
  }
}