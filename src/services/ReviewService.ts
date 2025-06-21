import { ReviewModel } from '../models/Review';
import { Review } from '../models/Review';

export class ReviewService {
    async getAll(): Promise<Review[]> {
        const docs = await ReviewModel.find();
        return docs.map(doc => new Review(
            // @ts-ignore
            doc._taster_twitterID,
            doc._taster_name,
            doc._wineTitle,
            doc._wineVariety,
            doc._winery,
            doc._points,
            doc._id
        ));
    }

    async add(review: Review): Promise<Review> {
        const doc = await ReviewModel.create({
            _taster_twitterID: review.taster_twitterID,
            _taster_name: review.taster_name,
            _wineTitle: review.wineTitle,
            _wineVariety: review.wineVariety,
            _winery: review.winery,
            _points: review.points
        });

        return new Review(
            // @ts-ignore
            doc._taster_twitterID,
            doc._taster_name,
            doc._wineTitle,
            doc._wineVariety,
            doc._winery,
            doc._points,
            doc._id
        );
    }
}
