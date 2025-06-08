import {ReviewModel} from '../models/Review';
import { Review } from '../models/Review';

export class ReviewService {
  async create(review: Review): Promise<Review> {
    const created = new ReviewModel({
      _taster_twitterID: review.taster_twitterID,
      _taster_name: review.taster_name,
      _wineTitle: review.wineTitle,
      _wineVariety: review.wineVariety,
      _winery: review.winery,
      _points: review.points,
    });
    const saved = await created.save();
    review.id = saved._id?.toString();
    return review;
  }

 async getAll(): Promise<Review[]> {
    const docs = await ReviewModel.find();
    return docs.map(doc => new Review(
      doc._taster_twitterID ?? ' ',
      doc._taster_name,
      doc._wineTitle,
      doc._wineVariety,
      doc._winery,
      doc._points,
      doc._id?.toString()
    ));
  }

  async update(id: string, data: Partial<Review>): Promise<Review | null> {
    const updatedDoc = await ReviewModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedDoc) return null;
    return new Review(
      updatedDoc._taster_twitterID ?? ' ',
      updatedDoc._taster_name,
      updatedDoc._wineTitle,
      updatedDoc._wineVariety,
      updatedDoc._winery,
      updatedDoc._points,
      updatedDoc._id?.toString()
    );
  }

  async delete(id: string): Promise<void> {
    await ReviewModel.findByIdAndDelete(id);
  }
}
