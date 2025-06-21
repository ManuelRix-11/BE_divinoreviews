// services/WineService.ts
import { WineModel } from "../models/Wine";
import { Wine } from "../models/Wine";

export class WineService {
    async getAll(): Promise<Wine[]> {
        const docs = await WineModel.find();
        return docs.map(doc => new Wine(
            doc._title,
            doc._variety,
            doc._winery,
            doc._country,
            doc._province,
            doc._description,
            doc._region_1,
            doc._region_2,
            doc._designation,
            doc._price,
            //@ts-ignore
            doc._id
        ));
    }

    async add(wine: Wine): Promise<Wine> {
        const doc = await WineModel.create({
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

        return new Wine(
            doc._title,
            doc._variety,
            doc._winery,
            doc._country,
            doc._province,
            doc._description,
            doc._region_1,
            doc._region_2,
            doc._designation,
            doc._price,
            //@ts-ignore
            doc._id
        );
    }
}
