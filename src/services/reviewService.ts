import { ReviewModel } from "../models/Review";
import { Review } from "../models/Review";

export class ReviewService {
    async createRecensione(recensioneData: {
        points: number;
        taster: {
            taster_name: string;
            taster_twitter_handle: string;
        };
        wine: {
            title: string;
            variety: string;
            winery: string;
        };
    }): Promise<Review> {
        try {
            const newRecensione = new ReviewModel({
                points: recensioneData.points,
                taster: {
                    taster_name: recensioneData.taster.taster_name,
                    taster_twitter_handle: recensioneData.taster.taster_twitter_handle
                },
                wine: {
                    title: recensioneData.wine.title,
                    variety: recensioneData.wine.variety,
                    winery: recensioneData.wine.winery
                }
            });

            const savedRecensione = await newRecensione.save();

            return new Review(
                savedRecensione.points,
                {
                    taster_name: savedRecensione.taster?.taster_name!,
                    taster_twitter_handle: savedRecensione.taster?.taster_twitter_handle!
                },
                {
                    title: savedRecensione.wine?.title!,
                    variety: savedRecensione.wine?.variety!,
                    winery: savedRecensione.wine?.winery!
                },
                savedRecensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nella creazione della recensione: ${error}`);
        }
    }

    async getAllRecensioni(page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find().skip(skip).limit(limit);

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
                rec._id?.toString()
            ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni: ${error}`);
        }
    }

    async getRecensioneById(id: string): Promise<Review | null> {
        try {
            const recensione = await ReviewModel.findById(id);
            if (!recensione) return null;

            return new Review(
                recensione.points,
                {
                    taster_name: recensione.taster?.taster_name!,
                    taster_twitter_handle: recensione.taster?.taster_twitter_handle!
                },
                {
                    title: recensione.wine?.title!,
                    variety: recensione.wine?.variety!,
                    winery: recensione.wine?.winery!
                },
                recensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nel recupero della recensione: ${error}`);
        }
    }

    async updateRecensione(id: string, updates: Partial<{
        points: number;
        taster: {
            taster_name: string;
            taster_twitter_handle: string;
        };
        wine: {
            title: string;
            variety: string;
            winery: string;
        };
    }>): Promise<Review | null> {
        try {
            const updatedRecensione = await ReviewModel.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedRecensione) return null;

            return new Review(
                updatedRecensione.points,
                {
                    taster_name: updatedRecensione.taster?.taster_name!,
                    taster_twitter_handle: updatedRecensione.taster?.taster_twitter_handle!
                },
                {
                    title: updatedRecensione.wine?.title!,
                    variety: updatedRecensione.wine?.variety!,
                    winery: updatedRecensione.wine?.winery!
                },
                updatedRecensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nell'aggiornamento della recensione: ${error}`);
        }
    }

    async deleteRecensione(id: string): Promise<boolean> {
        try {
            const result = await ReviewModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            throw new Error(`Errore nella cancellazione della recensione: ${error}`);
        }
    }

    async getRecensioniByWinery(winery: string, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({ "wine.winery": winery }).skip(skip).limit(limit);

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
                rec._id?.toString()
            ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per winery: ${error}`);
        }
    }

    async getRecensioniByTaster(tasterName: string, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({ "taster.taster_name": tasterName }).skip(skip).limit(limit);

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
                rec._id?.toString()
            ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per taster: ${error}`);
        }
    }

    async getRecensioniByPointsRange(minPoints: number, maxPoints: number, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({
                points: { $gte: minPoints, $lte: maxPoints }
            }).skip(skip).limit(limit);

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
                rec._id?.toString()
            ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per range di punti: ${error}`);
        }
    }
}