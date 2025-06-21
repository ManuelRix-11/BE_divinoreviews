import { ReviewerModel } from "../models/Reviewer";
import { Reviewer } from "../models/Reviewer";

export class ReviewerService {
    async getAll(): Promise<Reviewer[]> {
        const docs = await ReviewerModel.find();
        // @ts-ignore
        return docs.map(doc => new Reviewer(doc._twitterID, doc._name, doc._id));
    }

    async add(reviewer: Reviewer): Promise<Reviewer> {
        const doc = await ReviewerModel.create({
            _twitterID: reviewer.twitterID,
            _name: reviewer.name,
        });

        // @ts-ignore
        return new Reviewer(doc._twitterID, doc._name, doc._id);
    }
}
