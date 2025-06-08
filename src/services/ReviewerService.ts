import {ReviewerModel} from '../models/Reviewer';
import { Reviewer } from '../models/Reviewer';

export class ReviewService {

    async create(reviewer: Reviewer): Promise<Reviewer> {
        const created = new ReviewerModel({
          _taster_twitterID: reviewer.twitterID,
          _taster_name: reviewer.name,
        });
        const saved = await created.save();
        reviewer.id = saved._id?.toString();
        return reviewer;
      }
    
     async getAll(): Promise<Reviewer[]> {
        const docs = await ReviewerModel.find();
        return docs.map(doc => new Reviewer(
          doc._twitterID ?? ' ',
          doc._name,
          doc._id?.toString()
        ));
      }
    
      async update(id: string, data: Partial<Reviewer>): Promise<Reviewer | null> {
        const updatedDoc = await ReviewerModel.findByIdAndUpdate(id, data, { new: true });
        if (!updatedDoc) return null;
        return new Reviewer(
          updatedDoc._twitterID ?? ' ',
          updatedDoc._name,
          updatedDoc._id?.toString()
        );
      }
    
      async delete(id: string): Promise<void> {
        await ReviewerModel.findByIdAndDelete(id);
      }
}
