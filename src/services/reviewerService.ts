import { ReviewerModel } from '../models/Reviewer';

export class ReviewerService {
    async getAll() {
        return ReviewerModel.find();
    }

    async getById(id: string) {
        return ReviewerModel.findById(id);
    }

    async add(data: { taster_twitter_handle: string, taster_name: string }) {
        const reviewer = new ReviewerModel(data);
        return reviewer.save();
    }

    async update(id: string, data: { taster_twitter_handle: string, taster_name: string }) {
        return ReviewerModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return ReviewerModel.findByIdAndDelete(id);
    }
}
